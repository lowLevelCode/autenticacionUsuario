import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity(
    { 
        //name:"sis_bitacora_session", 
        synchronize: true 
    }
)
export class SisBitacoraSession { 


@PrimaryGeneratedColumn()
keyx: number;

@Column({ default: () => "now()", })
@CreateDateColumn()
fechaalta:  Date = new Date();

@Column({type: "character", nullable: false, length: 260 })
apikey :string = "";

@Column({type: "character", nullable: false, length: 260 })
tokenaccess :string = "";

@Column({type: "character", nullable: false, length: 260 })
tokenuser :string = "";

@Column({type: "character", nullable: false, length: 100 })
usuario :string = "";

@Column({type: "character", nullable: false, length: 100 })
macaddress :string = "";

}