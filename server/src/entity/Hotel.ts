import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Hotel {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'varchar', nullable: true})
    cityCode: string

    @Column({type: "jsonb", nullable: true})
    content: JSON

}
