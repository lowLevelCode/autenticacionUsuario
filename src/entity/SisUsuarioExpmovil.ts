import {Entity, PrimaryGeneratedColumn, Column,Unique, ManyToOne, PrimaryColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn, VersionColumn, Generated} from "typeorm";

@Entity(
    { 
        //name:"sis_bitacora_session_movil", 
        synchronize: true 
    }
)
export class SisUsuarioExpmovil { 

    @Generated('increment')
    @Column()
    keyx: number;

    @Column({ default: () => `now()` })
    @CreateDateColumn()
    fechaalta:  Date = new Date();

    @PrimaryColumn({ nullable: false, length: 18 })
    curp: string = "";

    @PrimaryColumn({ nullable: false, length: 11 })
    nss: string = "";
    
    @Column({type: "character", nullable: false, length: 40, name:"nombre"})
    nombre_usuario :string = "";

    @Column({type: "character", nullable: false, length: 40 })
    apellidopat :string = "";

    @Column({type: "character", nullable: false, length: 40 })
    apellidomat :string = "";

    @Column({type: "character", nullable: false, length: 100 })
    correo_electronico :string = "";
    
    @Column({type: "character", nullable: false, length: 13 })
    telefono :string;

    @Column({type: "character", length: 3 })
    codpais :string = "";

    @Column({type: "smallint" , nullable: false})
    esmenor :number = 0;

    @Column({type: "character", nullable: false, length: 13 })
    telefonofijo :string = "";

    @Column({ type: "character", nullable: false, length: 32 })
    contrasenia :string = "";

    @Column({type: "character", nullable: false, length: 2 })
    entidadnacimiento  :string = "";

    @Column({type: "character", nullable: false, length: 2 })
    actividadeconomica  :string = "";
    
    @Column({type: "character", length: 2 })
    sexo :string = "";

    @Column({type: "character", length: 10 })
    fechanacimiento :string = "";

    @Column({type: "character", length: 50 })
    nacionalidad :string = "";

    @Column({type: "smallint" , nullable: false})
    tipoahorrador: number = 0;

    @Column({type: "smallint" , nullable: false})
    recibiredocta: number = 0;

    @Column({type: "smallint" , nullable: false})
    tiporegistro: number = 0;

    @Column({type: "smallint" , nullable: false})
    tiporegistrofin: number = 0;

    @Column({ default: () => `now()` })    
    fechalogin:  Date = new Date();

    @Column({ default: () => `now()` })    
    fechatramite :  Date = new Date();

    @Column({ default: () => `now()` })    
    fechaexptramite  :  Date = new Date();

    @Column({ default: () => `now()` })    
    fechautenticamodulo :  Date = new Date();

    @Column({type: "smallint" , nullable: false})
    intentos: number = 0;

    @Column({type: "smallint" , nullable: false})
    estatusexpmovil: number = 0;

    @Column({type: "smallint" , nullable: false})
    autenticaenmodulo: number = 0;
    
    @Column({type: "smallint" , nullable: false})
    tipologin: number = 0;


    @Column({type: "smallint" , nullable: false})
    tipocambiocontrasenia: number = 0;

    @Column({type: "smallint" , nullable: false})
    replicainfo : number = 0;

    @Column({ type: "character", nullable: false, length: 10 })
    codpromocional :string = "";
    
    @Column({type: "integer" })
    foliosolicitud : number = 0;    
}