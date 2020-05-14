import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, OneToOne, JoinColumn, OneToMany, JoinTable, ManyToMany, CreateDateColumn, UpdateDateColumn, VersionColumn, Generated} from "typeorm";


@Entity({ synchronize: true })
export class SisUsuarios {

    @Generated('increment')
    @Column()
    keyx: number;

    @PrimaryColumn({length:18})
    curp:string;

    @PrimaryColumn({length:11})
    nss:string;

    @PrimaryColumn({length:100})
    nombre_usuario:string;

    @Column({length:100})
    correo_electronico:string;

    @Column({length:13})
    contrasenia:string;

    @Column({length:13})
    telefono:string;

    @Column()
    activo:number = 0;

    @Column()
    nip:number = 0;

    @Column()
    estadonip:number = 0;

    @Column()
    folio:number = 0;

    @Column()
    estadollamada:number = 0;

    @Column()
    fechallamada:Date;

    @Column()
    intentosautenticacion:number;

    @Column()
    fechaintento:Date;

    @Column({length:10})
    contraseniagenerada:string;

    @Column({length:260})
    apikeyalta:string;

    @Column({length:3})
    codpais:string;

    @Column()
    fechalogin:Date;

    @Column()
    tipologin:number = 0;

    @Column()
    tipocambiocontrasenia:number = 0;

    @Column({ default: () => `now()` })
    @CreateDateColumn()
    fechaalta :  Date = new Date();

    @Column({ default: () => `now()` })
    @UpdateDateColumn()
    fecha_actualizacion:  Date = new Date();

}