import { Module } from '@nestjs/common';
import { PessoaController } from './pessoa.controller';
import { PessoasArmazenadas } from './pessoa.dm';

@Module({
  providers:[PessoasArmazenadas],
  controllers: [PessoaController],
})
export class PessoaModule {}