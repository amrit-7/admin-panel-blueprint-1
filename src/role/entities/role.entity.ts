import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm"

@Entity()
export class Role {
    @ObjectIdColumn()
    id:ObjectID

    @Column()
    role:string
}
