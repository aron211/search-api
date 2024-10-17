import { Request } from 'src/requests/entities/request.entity';
import {
    Entity,
    Column,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn,
    Index,
    OneToMany,
} from 'typeorm';

//mapea a una tabla en la bd
@Entity()

export class Equip {


    @Index()
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column({ nullable: true })
    name: string;


    @Index()
    @Column({ nullable: true })
    description?: string;


    @Column({ nullable: true })
    urlImagen?: string | null;

    @Index()
    @Column({ nullable: true, default: true })
    status: boolean;

    @DeleteDateColumn({ select: false })
    deletedAt: Date;


    @CreateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;

    //Define una relación uno a muchos con la entidad Request. 
    //Cada equipo puede estar asociado con varias solicitudes.
    @OneToMany(() => Request, (request) => request.equip)
    request: Request[];

}
