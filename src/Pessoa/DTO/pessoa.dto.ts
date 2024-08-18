import {IsString, IsNotEmpty, IsNumber, MinLength} from "class-validator";


export class CriarPessoaDTO {
    @IsString()
    @IsNotEmpty({message : 'Insira seu Nome'})
    Nome: string;

    @IsNumber()
    @IsNotEmpty({message : 'Coloque sua data de nascimento'})
    Nascimento: number;

    @IsString()
    @IsNotEmpty({message : 'Coloque seu País de Origem'})
    Pais: string
    
}