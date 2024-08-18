import { Injectable } from "@nestjs/common";
import { PessoaEntity } from "./pessoa.entity";
import { alteraPessoaDTO } from "./DTO/alteraPessoa.dto";


@Injectable()
export class PessoasArmazenadas{
    #pessoas:PessoaEntity[] = [];

    async AdcionarPessoa(pessoa: PessoaEntity){
        this.#pessoas.push(pessoa);
    }
    async Pessoa(){
        return this.#pessoas
    }

    pesquisaId(id:string){
        const possivelPessoa = this.#pessoas.find(
            PessoaSalvo => PessoaSalvo.id === id
        );

        if(!possivelPessoa){
            throw new Error('Usuario não encontrado');
        }

        return possivelPessoa
    }

    pesquisaAno(ano:number){
        const possivelPessoa = this.#pessoas.find(
            pessoaSalva => pessoaSalva.nascimento === ano
        )
        return possivelPessoa
    }

    alteraPessoa(id:string, dadosNovos:alteraPessoaDTO){
        const pessoa = this.pesquisaId(id);
        Object.entries(dadosNovos).forEach(
            ([chave,valor]) => {
            
                if(chave === 'id'){
                    return
                }

            
                pessoa[chave] = valor;
            }
        )

        return pessoa;
        
    }
    async removePessoa(id:string){
        
        const pessoa = this.pesquisaId(id);

        this.#pessoas = this.#pessoas.filter(
            usuarioSalvo => usuarioSalvo.id !== id
        )

        return pessoa
    }


    get pessoas(){
        return this.#pessoas;
    }
}