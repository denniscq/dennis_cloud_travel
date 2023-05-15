import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class City {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: true})
    cityCode: string

    @Column({type: 'varchar', nullable: true})
    label: string

}
