import { Body, Controller, Param, Post, Get, Put, Delete } from "@nestjs/common";
import { CriarPessoaDTO } from "./DTO/pessoa.dto";
import { PessoaEntity } from "./pessoa.entity";
import { v4 as uuid} from "uuid"
import { PessoasArmazenadas } from "./pessoa.dm";
import { ListaPessoaDTO } from "./DTO/listaPessoa.dto";
import { alteraPessoaDTO } from "./DTO/alteraPessoa.dto";
import { RetornoPessoaDTO } from "./DTO/retornoPessoa.dto";

@Controller('/Pessoa')
export class PessoaController {

    constructor(private pessoas: PessoasArmazenadas) {}

    @Post()
        async criaPessoa(@Body()dadosPessoa:CriarPessoaDTO){
            var novaPessoa = new PessoaEntity(uuid(),dadosPessoa.Nome,dadosPessoa.Nascimento,dadosPessoa.Pais);
            
            this.pessoas.AdcionarPessoa(novaPessoa)
            return novaPessoa
        }

    @Put('/:id')
        async atualizaPessoa(@Body() dadosNovos:alteraPessoaDTO,@Param('id') id: string){
        var retoronoAlteracao = this.pessoas.alteraPessoa(id,dadosNovos);
        return retoronoAlteracao
        }
    
    @Delete('/:id')
        async removeUsuario(@Param('id') id: string){
            var retornoExclusao = await this.pessoas.removePessoa(id)
            var retorno = new RetornoPessoaDTO('Exclusão Efetuada',retornoExclusao);        
            return retorno;
        }

    @Get("/ano/:ano")
        async RetornaPessoaAno(@Param("ano") ano:number){
            var ListaPessoa = this.pessoas.pesquisaAno(ano);
            const ListaRetorno = new ListaPessoaDTO(ListaPessoa.id,ListaPessoa.nome, ListaPessoa.nascimento,ListaPessoa.pais);

            return {Pessoa: ListaRetorno}
        }
    
    @Get()
        async retornaPessoa(){
            var pessoasListadas = this.pessoas.pessoas;
            const ListaRetorno = pessoasListadas.map(
                pessoas => new ListaPessoaDTO(
                    pessoas.id,
                    pessoas.nome,
                    pessoas.nascimento,
                    pessoas.pais
                )
            );
        }
    }
    