import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity(
    { 
        //name:"sis_bitacora_session_movil", 
        synchronize: true 
    }
)
export class SisBitacoraSessionExpmovil { 


@PrimaryGeneratedColumn()
keyx: number;

@Column({ default: () => "now()", })
@CreateDateColumn()
fechaalta:  Date = new Date();

@Column({type: "character", nullable: false, length: 100 })
apikey :string = "";

@Column({type: "character", nullable: false, length: 100 })
tokenaccess :string = "";

@Column({type: "character", nullable: false, length: 100 })
tokenuser :string = "";

@Column({type: "character", nullable: false, length: 100 })
usuario :string = "";

@Column({type: "character", nullable: false, length: 50 })
macaddress :string = "";

}