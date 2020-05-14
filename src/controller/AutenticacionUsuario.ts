import { Request, Response, NextFunction } from "express";
import { getConnection } from "typeorm";
import * as jwt  from "jsonwebtoken";


export class AutenticacionUsuarioController {
        
    private readonly aforecoppelCom = getConnection("aforecoppel.com");    
    private readonly aforeglobal = getConnection("aforeglobal");    
    
    async autenticarUsuario(request: Request, response: Response, next: NextFunction){
        try {                    
                        
            let {usuario,contrasena,access_token} = request.body;            

            // Clausulas de guardia
            if(usuario == "" || usuario == undefined || usuario == null)
                response.status(400).send("Error en los parámetros, nombre de usuario vacío");                
            if(contrasena == "" || contrasena == undefined || contrasena == null)
                response.status(400).send("Error en los parámetros, contrasena vacía");
            if(access_token == "" || access_token == undefined || access_token == null)
                response.status(400).send("Error en los parámetros, Token Access vacío");                        

            let curp = "";
            let tipoExpediente = 0;
            let solicitaImagen = false;
            let nombre = "", paterno = "", materno = "";

            let autenticarUsuarioQueryRep = null;
            let consultarMenorQueryRep =  null;
            let cuotaDiariaQueryRep =  null;

            let statusconQueryRep = await this.aforecoppelCom.query(`SELECT estatus FROM sis_estatusconexiontester;`);               
            let [{tipoaccesoqueryrep}] = await this.aforecoppelCom.query(`SELECT * FROM fnTipoAcceso('${access_token}', 1) as tipoaccesoqueryrep;`);                                    

            // apunta a otra base de datos
            let [{current_date}]  = await this.aforeglobal.query(`SELECT NOW()::DATE as current_date;`);    

            // transformar fecha
            let d = new Date(current_date);
            let month = '' + (d.getMonth() + 1);
            let day = '' + d.getDate();
            let year = d.getFullYear();

            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;

            let formatDate = [year, month, day].join('-') + " 23:59:00";            

            let [{fecha}] = await this.aforeglobal.query(`SELECT * FROM fnobtenerdiahabil(CURRENT_DATE, 2) as fecha;`);                
            //let fecha = "2012-12-12"; 


            // generemos el token            
            let tokenUser = jwt.sign({
                token_user: 'auth0|' + access_token + usuario,
            }, 'auth0-mock', { expiresIn: 3600 });            

            // tipo acceso trae 1 ejeucatr usuario movil si es diferente esjecutar la normal
            if(tipoaccesoqueryrep == 1) // para movil
            {                

                let tempqueryrep = await this.aforecoppelCom.query(`
                SELECT curp, codPais, telefono, TRIM(correo) AS correo, TRIM(usuario) AS usuario, '' AS password, respuesta, tipocambiocontrasenia, estatusCorreo, 
                TRIM(nombre), TRIM(apellidopat), TRIM(apellidomat), TRIM(nss)
                FROM fnautentificarusuarioMovil('${access_token}','${tokenUser}','${usuario}','${contrasena}', '${fecha}')
                 as tempqueryrep;`);                  

                autenticarUsuarioQueryRep = tempqueryrep[0];
            }
            else{     //           
                
                let tempqueryrep = await this.aforecoppelCom.query(`
                SELECT curp, codPais, telefono, TRIM(correo) AS correo, TRIM(usuario) AS usuario, '' AS password, 
                respuesta, tipocambiocontrasenia, estatusCorreo, '' AS nombre
                FROM fnautentificarusuario('${access_token}','${tokenUser}','${usuario}','${contrasena}', '${fecha}') as tempqueryrep;`);                  

                autenticarUsuarioQueryRep = tempqueryrep[0];
            }
                      
            console.log("Usuario autenticado:",autenticarUsuarioQueryRep);

            let curptutor = "asdasd";

            let rmRegistromovilQueryRep = await this.aforecoppelCom.query(`
                SELECT COUNT(estatusproceso) FROM rmregistromovil 
                WHERE curptutor = '${curptutor}' and estatusproceso IN(8, 16, 17);`
            );                      


            console.log("Rm registro:", rmRegistromovilQueryRep);

            let shRet = 500;
			let shTipo = 0;

			if(autenticarUsuarioQueryRep.respuesta == 1){
				cuotaDiariaQueryRep = await this.aforeglobal.query(`
                    SELECT TRIM(paterno) AS paterno, TRIM(materno) AS materno, TRIM(nombres) AS nombres 
                    FROM afop_cuota_diaria WHERE n_unico = '${autenticarUsuarioQueryRep.curp}a';`
                );                 
                
                if(cuotaDiariaQueryRep[0])
                {
                    nombre = cuotaDiariaQueryRep[0].nombres ? cuotaDiariaQueryRep[0].nombres : '';
                    paterno = cuotaDiariaQueryRep[0].paterno ? cuotaDiariaQueryRep[0].paterno : '';
                    materno = cuotaDiariaQueryRep[0].materno ? cuotaDiariaQueryRep[0].materno : '';

                    shRet = 200;
					shTipo = 0;
                }
                else{
                    shRet = 500;
					shTipo = 0;
                }
                
			}
            else if(autenticarUsuarioQueryRep.respuesta == 10 || autenticarUsuarioQueryRep.respuesta == 11 || autenticarUsuarioQueryRep.respuesta == 13 || autenticarUsuarioQueryRep.respuesta == -8 || autenticarUsuarioQueryRep.respuesta == -102 || autenticarUsuarioQueryRep.respuesta == -103)
            {
				cuotaDiariaQueryRep = await this.aforeglobal.query(`
                    SELECT TRIM(paterno) AS paterno, TRIM(materno) AS materno, TRIM(nombres) AS nombres 
                    FROM afop_cuota_diaria WHERE n_unico = '${autenticarUsuarioQueryRep.curp}a';`
                );                 
                

                if(cuotaDiariaQueryRep[0])
                {
                    nombre = cuotaDiariaQueryRep[0].nombres ? cuotaDiariaQueryRep[0].nombres : '';
                    paterno = cuotaDiariaQueryRep[0].paterno ? cuotaDiariaQueryRep[0].paterno : '';
                    materno = cuotaDiariaQueryRep[0].materno ? cuotaDiariaQueryRep[0].materno : '';

                    shRet = 200;
					shTipo = 0;
                }
                else{
                    shRet = 500;
					shTipo = 0;
                }
				
				if(autenticarUsuarioQueryRep.respuesta == 10)
				{
					consultarMenorQueryRep = await this.aforecoppelCom.query(`
						SELECT curpahorrador, '', '', '', '', '', idprocesoexpediente, 0, 0, '', '', '', '' 
						FROM fun_consultarmenor('${autenticarUsuarioQueryRep.respuesta}');`
                    ); 
                    
					shRet = 200;
                    shTipo = 200;
                    tipoExpediente = consultarMenorQueryRep.idprocesoexpediente;
                    curp =  consultarMenorQueryRep.curpahorrador;
				}
				else if(autenticarUsuarioQueryRep.respuesta == 11){
					shRet = 401;
					shTipo=425;
				}
				else if(autenticarUsuarioQueryRep.respuesta == 13){
					shRet = 403;
					shTipo=427;
				}
				else if(autenticarUsuarioQueryRep.respuesta == -8){
					shRet = 402;
					shTipo=424;
				}
				else if(autenticarUsuarioQueryRep.respuesta == -102){                
					curp = "";
					solicitaImagen = true;
					tipoExpediente = 77;

					shRet = 404;
					shTipo=428;
				}
				else if(autenticarUsuarioQueryRep.respuesta == -103){
					shRet=200;
					shTipo=201;
				}                
            }
            else if(autenticarUsuarioQueryRep.respuesta == -1){
                shRet=400;
                shTipo=406;
            }
            else if(autenticarUsuarioQueryRep.respuesta== -2){
                shRet=500;
                shTipo=0;
            }
            else if (autenticarUsuarioQueryRep.respuesta== -4){
                shRet=400;
                shTipo=418;
            }
            else if (autenticarUsuarioQueryRep.respuesta== -5){
                shRet=400;
                shTipo=419;
            }
            else if (autenticarUsuarioQueryRep.respuesta == -8){
                shRet=400;
                shTipo=424;
            }
            else if (autenticarUsuarioQueryRep.respuesta == -7){
                shRet=400;
                shTipo=423;
            }
            else if (autenticarUsuarioQueryRep.respuesta == -9){
                shRet=400;
                shTipo=425;
            }
            else if (autenticarUsuarioQueryRep.respuesta == -10){
                shRet=400;
                shTipo=426;
            }
            
            let [{mensaje}] = await this.aforecoppelCom.query(`SELECT * FROM fnObtenerMensaje(${shRet}, ${shTipo}, 0) as mensaje;`);            
                           
            // reemplazamos caracteres extraños
            if(mensaje)
            {
                mensaje  = mensaje.replace(/&aacute;/g, 'á');
                mensaje  = mensaje.replace(/&eacute;/g ,'é');
                mensaje  = mensaje.replace(/&iacute;/g , 'í');
                mensaje  = mensaje.replace(/&oacute;/g, 'ó');
                mensaje  = mensaje.replace(/&uacute;/g, 'ú');
            }            

            let respuesta = {   
                status:shRet,
                mensaje:mensaje,
                FechaExpiracion: formatDate,
                informacion:{
                    curp: autenticarUsuarioQueryRep.curp,
                    codigoPais: autenticarUsuarioQueryRep.codpais,
                    telefono: autenticarUsuarioQueryRep.telefono,
                    correo: autenticarUsuarioQueryRep.correo,
                    usuario: autenticarUsuarioQueryRep.usuario,
                    apellidopaterno: paterno,
                    apellidomaterno: materno,
                    nombre:nombre,
                    tipoCambioContrasenia:autenticarUsuarioQueryRep.tipoCambioContrasenia,
                    user_token: tokenUser,
                    estatusCorreo:autenticarUsuarioQueryRep.estatusCorreo,
                    estatusImagen:[
                        {
                            curp:curp,
                            solicitaImagen:solicitaImagen,
                            tipoExpediente: tipoExpediente
                        }
                    ],
                    nss:autenticarUsuarioQueryRep.nss
                }
            };            

            console.log(respuesta);
            return respuesta;

        } catch (error) {
            console.log(error);
            response.status(500).send("Error interno de servidor");
        }
    }
 
    
}