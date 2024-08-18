import { IsString, IsNotEmpty,IsNumber } from "class-validator";

export class alteraPessoaDTO {
    @IsString()
    @IsNotEmpty({message : 'Insira seu novo Nome'})
    Nome: string;

    @IsNumber()
    @IsNotEmpty({message : 'Coloque sua nova data de nascimento'})
    Nascimento: number;

    @IsString()
    @IsNotEmpty({message : 'Coloque seu novo País'})
    Pais: string
}