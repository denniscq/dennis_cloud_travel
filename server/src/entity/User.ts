import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: true})
    firstName: string
    
    @Column({type: 'varchar', nullable: true})
    lastName: string
    
    @Column({type: 'varchar', nullable: true})
    age: number

}
