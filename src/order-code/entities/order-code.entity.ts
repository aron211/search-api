import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert,  } from 'typeorm';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
@Entity()
export class OrderCode {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    code: string;
  
    constructor(@InjectConnection() private readonly connection: Connection) {}
  
    @BeforeInsert()
    async generateCode() {
      const result = await this.connection.query(`SELECT nextval('order_code_seq')`);
      const nextval = result[0].nextval;
      this.code = nextval.toString().padStart(8, '0');
    }
}
