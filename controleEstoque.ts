// Interface para controle básico dos produtos
interface IControle {
    adicionar(novoProduto: Produto): void;
    exibirTodos(): void;
}

// Classe Abstrata "Pai"
abstract class Produto {
    constructor(
        private idProduto: string,
        protected setor: string,
        public nome: string,
        public quantidade: number,
    ) {}

    // Método abstrato para retornas os valores como uma string
    abstract toString(): string;

    // Método abstrato para exibir um produto específico
    abstract exibirUm(produto: Produto): void;

    // Get para permitir controle da leitura do idProduto
    get _idProduto(): string {
        return this.idProduto;
    }

    // Set para permitir controle da modificação do idProduto
    set _idProduto(novoId: string) {
        // Verificação se a entrada do novoId contém 6 dígitos númericos, caso contrário lança um erro
        if (/^\d{6}$/.test(novoId) == false) {
            throw new Error("O ID deve conter 6 dígitos númericos!");
        }
        // Senão estiver errado, atribui o valor ao atributo idProduto
        this.idProduto = novoId;
    }

    // Get para permitir controle da leitura do setor
    get _setor(): string {
        return this.setor;
    }

    // Set para permitir controle da modificação do setor
    set _setor(novoSetor: string) {
        // Verificação se a entrada do novoSetor não está vazia, caso contrário lança um erro
        if (novoSetor.length == 0) {
            throw new Error("O campo setor não pode estar vazio!");
        }
        // Senão estiver vazia, atribui o valor ao atributo setor
        this.setor = novoSetor;
    }

    // Get para permitir controle da leitura do nome
    get _nome(): string {
        return this.nome;
    }

    // Set para permitir controle da modificação do nome
    set _nome(novoNome: string) {
        // Verificação se a entrada do novoNome não está vazia, caso contrário lança um erro
        if (novoNome.length == 0) {
            throw new Error("O campo nome não pode estar vazio!");
        }
        // Senão estiver vazia, atribui o valor ao atributo nome
        this.nome = novoNome;
    }

    // Get para permitir controle da leitura da quantidade
    get _quantidade(): number {
        return this.quantidade;
    }

    // Set para permitir controle da modificação da quantidade
    set _quantidade(novaQuantidade: number) {
        // Verificação se a entrada da novaQuantidade é positiva, caso contrário lança um erro
        if (novaQuantidade < 0) {
            throw new Error(
                "O valor a ser adicionado na quantidade do produto deve ser positivo!",
            );
        }
        // Senão for negativo, atribui o valor ao atributo quantidade
        this.quantidade = novaQuantidade;
    }
}

// classe referente ao Estoque que implementa a interface IControle e é "filha" da classe abstrata Produto
class Estoque extends Produto implements IControle {
    private idPilha: string;
    protected arrEstoque: Produto[] = [];

    // inicialização dos atributos para que sejam vazios e permitam a entrada do primeiro objeto pelo usuiário
    constructor(
        idProduto: string = "",
        idPilha: string = "",
        setor: string = "",
        nome: string = "",
        quantidade: number = 0,
    ) {
        super(idProduto, setor, nome, quantidade);
        this.idPilha = idPilha;
    }

    // Get para permitir controle da leitura do idPilha
    get _idPilha(): string {
        return this.idPilha;
    }

    // Set para permitir controle da modificação do idPilha
    set _idPilha(novoIdPilha: string) {
        // Verificação se o novoIdPilha contém 6 dígitos númericos, caso contrário lança um erro
        if (/^\d{6}$/.test(novoIdPilha) == false) {
            throw new Error("O ID deve conter 6 dígitos númericos!");
        }
        // Senão estiver errado, atribui o valor ao atributo idPilha
        this.idPilha = novoIdPilha;
    }

    // Get para permitir controle da leitura do arrEstoque
    get _arrEstoque(): Produto[] {
        return this.arrEstoque;
    }

    // Implementação do método toString que retorna uma string com os valores desejados
    toString(): string {
        return (`\nID do Produto: ${this._idProduto}\nID da Pilha: ${this.idPilha}\nNome do Produto: ${this.nome}\nSetor: ${this.setor}\nQuantidade no Estoque: ${this.quantidade}`);
    }

    // Implementação do método adicionar, nessa implementação ele adiciona um objeto ao array arrEstoque
    adicionar(novoProduto: Produto): void {
        this.arrEstoque.push(novoProduto);
    }

    // Implementação do método exibirTodos, nessa implementação ele exibe todos os objetos do array arrEstoque
    exibirTodos(): void {
        for (const produto of this.arrEstoque) {
            console.log(`${produto.toString()}`);
        }
    }

    // Implementação do método exibirUm, nessa implementação ele exibe um objeto específico
    exibirUm(produto: Produto): void {
        console.log(`${produto.toString()}`);
    }
}

// classe referente a Prateleira que implementa a interface IControle e é "filha" da classe abstrata Produto
class Prateleira extends Produto implements IControle {
    public preco: number;
    protected arrPrateleira: Produto[] = [];

    // inicialização dos atributos para que sejam vazios e permitam a entrada do primeiro objeto pelo usuiário
    constructor(
        idProduto: string = "",
        setor: string = "",
        nome: string = "",
        quantidade: number = 0,
        preco: number = 0,
    ) {
        super(idProduto, setor, nome, quantidade);
        this.preco = preco;
    }

    // Get para permitir controle da leitura do preço
    get _preco(): number {
        return this.preco;
    }

    // Set para permitir controle da modificação do preço
    set _preco(novoPreco: number) {
        // Verificação se o novoPreco é positivo, se for, atribui o valor ao atributo preco, senão, lança um erro
        if (novoPreco > 0) {
            this.preco = novoPreco;
        } else {
            throw new Error("O preço deve ser maior que 0 reais!");
        }
    }

    // Get para permitir controle da leitura do arrPrateleira
    get _arrPrateleira(): Produto[] {
        return this.arrPrateleira;
    }

    // Implementação do método toString que retorna uma string com os valores desejados
    toString(): string {
        return (`\nID do Produto: ${this._idProduto}\nNome do Produto: ${this.nome}\nPreco: ${this.preco}\nSetor: ${this.setor}\nQuantidade na Prateleira: ${this.quantidade}`);
    }

    // Implementação do método adicionar, nessa implementação ele adiciona um objeto ao array arrPrateleira
    adicionar(novoProduto: Produto): void {
        this.arrPrateleira.push(novoProduto);
    }

    // Implementação do método exibirTodos, nessa implementação ele exibe todos os objetos do array arrPrateleira
    exibirTodos(): void {
        for (const produto of this.arrPrateleira) {
            console.log(produto.toString());
        }
    }

    // Implementação do método exibirUm, nessa implementação ele exibe um objeto específico
    exibirUm(produto: Produto): void {
        console.log(`${produto.toString()}`);
    }
}

// Função para adicionar um novo produto ao array de estoque
function adicionarEstoque(estoque: Estoque) {
    // Tratamento de execções, caso algum erro seja lançado, para a execução e exibe o erro
    try {
        // Entrada de dados
        let idProduto: any = prompt("Informe o ID do produto: ");
        if (/^\d{6}$/.test(idProduto) == false) {
            throw new Error("O ID deve conter 6 dígitos númericos!");
        }
        let idPilha: any = prompt(
            "Informe o ID da pilha onde o produto está localizado: ",
        );
        if (/^\d{6}$/.test(idPilha) == false) {
            throw new Error("O ID deve conter 6 dígitos númericos!");
        }
        let setor: any = prompt("Informe o setor do produto: ");
        if (setor.length == 0) {
            throw new Error("O campo setor não pode estar vazio!");
        }
        let nome: any = prompt("Informe o nome do produto: ");
        if (nome.length == 0) {
            throw new Error("O campo nome não pode estar vazio!");
        }
        let quantidade: number = Number(
            prompt("Informe a quantidade do produto no estoque: "),
        );
        if (quantidade < 0) {
            throw new Error(
                "O valor a ser adicionado na quantidade do produto deve ser positivo!",
            );
        }

        // Criação de um novo objeto "novoProduto"
        const novoProduto = new Estoque(
            idProduto,
            idPilha,
            setor,
            nome,
            quantidade,
        );
        // chamada do método adicionar da classe estoque
        estoque.adicionar(novoProduto);
        console.log("\nProduto adicionado ao estoque!\n");
        // Mensagem de erro
    } catch (error) {
        console.log("\nFalha ao adicionar produto no estoque!\n");
        console.error(`Erro: ${(error as Error).message}`);
    }
}

// Função para mover do estoque para a prateleira
function moverParaPrateleira(estoque: Estoque, prateleira: Prateleira) {
    // Tratamento de execções, caso algum erro seja lançado, para a execução e exibe o erro
    try {
        // Entrada de dados
        let idProduto: any = prompt(
            "Informe o ID do produto que deseja mover para a prateleira: ",
        );
        let quantidade: number = Number(
            prompt("Informe a quantidade que deseja mover: "),
        );

        // Teste pra verificar a validade dos dados, caso sejam inválidos, lança um erro
        if (
            /^\d{6}$/.test(idProduto) == false || isNaN(quantidade) ||
            quantidade <= 0
        ) {
            throw new Error(
                "Entrada inválida. Certifique-se de fornecer um ID válido e uma quantidade positiva.",
            );
        }

        // Método para procurar o objeto com o id correspondente, se achado, retorna o objeto
        let produtoMover = estoque._arrEstoque.find((produto) =>
            produto._idProduto == idProduto
        );

        // Verificação se o objeto foi encontrado
        if (produtoMover) {
            // Verificação se a quantidade que se deseja mover do estoque para a prateleira é menor iu igual a quantidade armazenada no estoque
            if (produtoMover._quantidade >= quantidade) {
                // Método para procurar o objeto com o id correspodente afim de verificar se já existe um objeto do mesmo tipo na prateleira
                let produtoPrateleira = prateleira._arrPrateleira.find((
                    produto,
                ) => produto._idProduto == idProduto);

                // Se a variiável for igual a null, significa que não tem nenhum objeto correspondente dentro do array arrPrateleira
                if (produtoPrateleira == null) {
                    // Entrada do preço do produto
                    let preco: number = Number(
                        prompt("Informe o preço do produto: "),
                    );

                    // Criação de um novo objeto "produto"
                    const produto = new Prateleira(
                        produtoMover._idProduto,
                        produtoMover._setor,
                        produtoMover._nome,
                        quantidade,
                        preco,
                    );

                    // Chamada do método adicionar, para adicionar o produto ao array arrPrateleira
                    prateleira.adicionar(produto);
                } else {
                    // Caso já exista um objeto correspondente na prateleira, somente a quantidade é aumentada
                    produtoPrateleira._quantidade += quantidade;
                }

                // Quantidade do produto correspondente no estoque é subtraída pela quantidade movida
                produtoMover._quantidade -= quantidade;
                console.log("\nProduto adicionado à prateleira!\n");
            } else {
                // Erro lançado
                throw new Error(
                    "A quantidade a ser movida deve ser menor ou igual a quantidade presente no estoque.",
                );
            }
        } else {
            // Erro lançado
            throw new Error(
                "Produto não encontrado no estoque!",
            );
        }
        // Mensagem de erro
    } catch (error) {
        console.log("\nFalha ao mover produto à prateleira!\n");
        console.error(`Erro: ${(error as Error).message}`);
    }
}

// Função para remover uma quantidade do produto do estoque ou da prateleira

function remover(estoque: Estoque, prateleira: Prateleira, opcao: number) {
    // Tratamento de execções, caso algum erro seja lançado, para a execução e exibe o erro
    try {
        // Entrada de dados
        let idProduto: any = prompt(
            "Informe o ID do produto que deseja remover: ",
        );
        let quantidade: number = Number(
            prompt("Informe a quantidade que deseja remover: "),
        );

        // Validação dos dados
        if (
            /^\d{6}$/.test(idProduto) == false || isNaN(quantidade) ||
            quantidade <= 0
        ) {
            throw new Error(
                "Entrada inválida. Certifique-se de fornecer um ID válido e uma quantidade positiva.",
            );
        }

        // Se o parametro opcao for igual a 1, a remoção ocorrerá no Estoque
        if (opcao == 1) {
            // Método para procurar o objeto com o id correspondente, se achado, retorna o objeto
            let produtoRemoverEstoque = estoque._arrEstoque.find((remover) =>
                remover._idProduto == idProduto
            );

            // Verificação se o objeto foi encontrado
            if (produtoRemoverEstoque) {
                // Verificação se a quantidade que se deseja remover do estoque é menor ou igual a quantidade armazenada
                if (produtoRemoverEstoque._quantidade >= quantidade) {
                    // Remoção da quantidade desejada
                    produtoRemoverEstoque._quantidade -= quantidade;
                } else {
                    // Erro lançado
                    throw new Error(
                        "A quantidade a ser removida deve ser menor ou igual a quantidade presente no estoque.",
                    );
                }
            } else {
                // Erro lançado
                throw new Error("Produto não encontrado no estoque!");
            }
            console.log("\nRemoção realizada com sucesso!\n");

            // Caso o parametro opcao seja diferente de 1, a remoção ocorrerá na prateleira
        } else {
            // Método para procurar o objeto com o id correspondente, se achado, retorna o objeto
            let produtoRemoverPrateleira = prateleira._arrPrateleira.find(
                (remover) => remover._idProduto == idProduto,
            );

            // Verificação se o objeto foi encontrado
            if (produtoRemoverPrateleira) {
                // Verificação se a quantidade que se deseja remover do estoque é menor ou igual a quantidade armazenada
                if (produtoRemoverPrateleira._quantidade >= quantidade) {
                    // Remoção da quantidade desejada
                    produtoRemoverPrateleira._quantidade -= quantidade;
                } else {
                    // Lança um erro
                    throw new Error(
                        "A quantidade a ser removida deve ser menor ou igual a quantidade presente na prateleira.",
                    );
                }
            } else {
                // Lança um erro
                throw new Error("Produto não encontrado na prateleira!");
            }
            // Mensagem de confirmação
            console.log("\nRemoção realizada com sucesso!\n");
        }
        // Mensagem de erro
    } catch (error) {
        console.error(`Erro: ${(error as Error).message}`);
    }
}

// Função para buscar um produto específico no estoque ou na prateleira
function buscar(estoque: Estoque, prateleira: Prateleira, opcao: number) {
    // Tratamento de execções, caso algum erro seja lançado, para a execução e exibe o erro
    try {
        // Entrada de dados
        let idProduto: any = prompt(
            "Informe o ID do produto que deseja buscar: ",
        );
        // Validação dos dados
        if (/^\d{6}$/.test(idProduto) == false) {
            throw new Error(
                "Entrada inválida. Certifique-se de fornecer um ID válido",
            );
        }
        // Se o parametro opcao for igual a 1, a busca será realizada no estoque
        if (opcao == 1) {
            // Método para procurar o objeto com o id correspondente, se achado, retorna o objeto
            let produtoEstoqueBuscar = estoque._arrEstoque.find((buscar) =>
                buscar._idProduto == idProduto
            );

            // Verificação se o objeto foi encontrado
            if (produtoEstoqueBuscar) {
                // Exibe uma mensagem e chama o método exibirUm e exibe o produto
                console.log("\n\tProduto encontrado!\n");
                produtoEstoqueBuscar.exibirUm(produtoEstoqueBuscar);
            } else {
                // Lança um erro
                throw new Error("Produto não encontrado no estoque!");
            }

            // Se o parametro opcao for diferente de 1, a busca será realizada na prateleira
        } else {
            // Método para procurar o objeto com o id correspondente, se achado, retorna o objeto
            let produtoPrateleiraBuscar = prateleira._arrPrateleira.find(
                (buscar) => buscar._idProduto == idProduto,
            );

            // Verificação se o objeto foi encontrado
            if (produtoPrateleiraBuscar) {
                // Exibe uma mensagem e chama o método exibirUm e exibe o produto
                console.log("\n\tProduto encontrado!\n");
                produtoPrateleiraBuscar.exibirUm(produtoPrateleiraBuscar);
            } else {
                // Lança um erro
                throw new Error("Produto não encontrado na prateleira!");
            }
        }

        // Mensagem de erro
    } catch (error) {
        console.error(`Erro: ${(error as Error).message}`);
    }
}

// Função que exibe todos os objetos do estoque ou da prateleira
function listarTodos(estoque: Estoque, prateleira: Prateleira, opcao: number) {
    // Se o parametro opcao for igual a 1, os objetos do estoque serão exibidos por meio da chamada do método exibirTodos
    if (opcao == 1) {
        console.log("\n\tProdutos no Estoque:\n");
        estoque.exibirTodos();

        // Se o parametro opcao for diferente de 1, os objetos da prateleira serão exibidos por meio da chamada do método exibirTodos
    } else {
        console.log("\n\tProdutos na Prateleira:\n");
        prateleira.exibirTodos();
    }
}

// Função para modificar o preço de um objeto na prateleira
function modificarPreco(prateleira: Prateleira) {
    // Tratamento de execções, caso algum erro seja lançado, para a execução e exibe o erro
    try {
        // Entrada de dados
        let idProduto: any = prompt(
            "Informe o ID do produto que deseja modificar o preço: ",
        );
        let novoPreco: number = Number(prompt("Informe o novo preço: "));

        // Validação dos dados
        if (/^\d{6}$/.test(idProduto) == false || novoPreco < 0) {
            throw new Error(
                "Entrada inválida. Certifique-se de fornecer um ID válido e que o novo preço seja maior que 0",
            );
        }

        // Método para procurar o objeto com o id correspondente, se achado, retorna o objeto
        let produtoPrateleiraModificar = prateleira._arrPrateleira.find(
            (modificar) => modificar._idProduto == idProduto,
        );

        // Verificação se o objeto foi encontrado
        if (produtoPrateleiraModificar) {
            // Modifica o valor do para o valor do novoPreco
            (produtoPrateleiraModificar as Prateleira)._preco = novoPreco;
            console.log("\nO preço do produto foi atualizado com sucesso!");
            // lança um erro
        } else {
            throw new Error("Produto não encontrado na prateleira!");
        }
        // Mensagem de erro
    } catch (error) {
        console.error(`Erro: ${(error as Error).message}`);
    }
}

// Função para apagar um objeto do array de estoque ou do de prateleira
function apagar(estoque: Estoque, prateleira: Prateleira, opcao: number) {
    // Tratamento de execções, caso algum erro seja lançado, para a execução e exibe o erro
    try {
        // Entrada de dados
        let idProduto: any = prompt("Informe o ID do produto para apagar: ");

        // Validação dos dados
        if (/^\d{6}$/.test(idProduto) == false) {
            throw new Error(
                "Entrada inválida. Certifique-se de fornecer um ID válido",
            );
        }

        // Inicializaçao do index
        let index = -1;

        // Se o parametro opcao for igual a 1, um objeto do estoque será apagado
        if (opcao == 1) {
            // Laço de repetição que busca o objeto correspondente (com base no id)
            for (let i = 0; i < estoque._arrEstoque.length; i++) {
                if (idProduto == estoque._arrEstoque[i]._idProduto) {
                    index = i;
                    break;
                }
            }

            // Utilização do método splice para remover/apagar o objeto do array
            estoque._arrEstoque.splice(index, 1);
            console.log("\nO produto foi apagado do estoque!\n");

            // Se o parametro opcao for diferente de 1, um objeto da prateleira será apagado
        } else {
            // Laço de repetição que busca o objeto correspondente (com base no id)
            for (let i = 0; i < prateleira._arrPrateleira.length; i++) {
                if (idProduto == prateleira._arrPrateleira[i]._idProduto) {
                    index = i;
                    break;
                }
            }

            // Utilização do método splice para remover/apagar o objeto do array
            prateleira._arrPrateleira.splice(index, 1);
            console.log("\nO produto foi apagado da prateleira!\n");
        }

        // Mensagem de erro
    } catch (error) {
        console.error(`Erro: ${(error as Error).message}`);
    }
}

// Função principal
function main() {
    // Inicialização base dos objetos das classes Estoque e Prateleira
    const estoque = new Estoque();
    const prateleira = new Prateleira();

    // Loop infinito
    for (;;) {
        // Menu de opções
        console.log("\n\tMenu:\n");
        console.log("0 - Sair do Programa");
        console.log("1 - Adicionar ao Estoque");
        console.log("2 - Mover para Prateleira");
        console.log("3 - Buscar por Produto no Estoque");
        console.log("4 - Buscar por Produto na Prateleira");
        console.log("5 - Modificar Preço do Produto");
        console.log("6 - Remover Quantidade do Produto do Estoque");
        console.log("7 - Remover Quantidade do Produto da Prateleira");
        console.log("8 - Apagar Produto do Estoque");
        console.log("9 - Apagar Produto da Prateleira");
        console.log("10 - Exibir Todos os Produtos do Estoque");
        console.log("11 - Exibir Todos os Produtos da Prateleira");
        let opcao: number = Number(prompt("\nEscolha uma Opção: "));

        // Escolha-caso com a variavel opcao como base
        switch (opcao) {
            // Chama a função de adicionar ao estoque
            case 1:
                adicionarEstoque(estoque);
                break;

            // Chama a função de mover para a prateleira
            case 2:
                moverParaPrateleira(estoque, prateleira);
                break;

            // Chama a função de buscar no estoque
            case 3:
                buscar(estoque, prateleira, 1);
                break;
            // Chama a função de buscar na prateleira
            case 4:
                buscar(estoque, prateleira, 2);
                break;

            // Chama a função de modificar preço do produto
            case 5:
                modificarPreco(prateleira);
                break;

            // Chama a função de remover uma quantia de um produto do estoque
            case 6:
                remover(estoque, prateleira, 1);
                break;
            // Chama a função de remover uma quantia de um produto da prateleira
            case 7:
                remover(estoque, prateleira, 2);
                break;

            // Chama a função de apagar um objeto do array de estoque
            case 8:
                apagar(estoque, prateleira, 1);
                break;

            // Chama a função de apagar um objeto do array de prateleira
            case 9:
                apagar(estoque, prateleira, 2);
                break;

            // Chama a função de exibir todos os objetos do estoque
            case 10:
                listarTodos(estoque, prateleira, 1);
                break;

            // Chama a função de exibir todos os objetos da prateleira
            case 11:
                listarTodos(estoque, prateleira, 2);
                break;

            // Finaliza o programa, "quebrando" o loop infinito com um return
            case 0:
                console.log("\nPrograma Finalizado!\n");
                return;

            // É chamado caso o usuário digite uma opção inválida para o menu
            default:
                console.log("\nOpção inválida!\n");
                break;
        }
    }
}

// Inicializa o programa
main();
