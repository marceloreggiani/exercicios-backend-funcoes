const carrinho = {
    nomeDoCliente: "Guido Bernal",
    produtos: [
        {
            id: 1,
            nome: "Camisa",
            qtd: 3,
            precoUnit: 3000,
        },
        {
            id: 2,
            nome: "Bermuda",
            qtd: 2,
            precoUnit: 5000,
        },
    ],
    imprimirResumo: function () {
        console.log(`Cliente: ${this.nomeDoCliente}`);
        console.log(`Total de itens: ${this.calcularTotalDeItens()} itens`);
        console.log(`Total a pagar: R$ ${this.calcularTotalAPagar().toFixed(2)}`);
    },
    addProduto: function (produto) {
        const index = this.produtos.findIndex((p) => p.id === produto.id); // REVER ARROW FUNCTION MELHOR.
        if (index !== -1) {
            this.produtos[index].qtd += produto.qtd;
        } else {
            this.produtos.push(produto);
        }
    },
    imprimirDetalhes: function () {
        console.log(`Cliente: ${this.nomeDoCliente}`);
        this.produtos.forEach((produto, index) => {
            console.log(
                `Item ${index + 1} - ${produto.nome} - ${produto.qtd} und - R$ ${(produto.qtd * produto.precoUnit / 100).toFixed(2)}`
            );
        });
        console.log(`Total de itens: ${this.calcularTotalDeItens()} itens`);
        console.log(`Total a pagar: R$ ${this.calcularTotalAPagar().toFixed(2)}`);
    },
    calcularTotalDeItens: function () {
        let totalItens = 0;
        for (const produto of this.produtos) {
            totalItens += produto.qtd;
        }
        return totalItens;
    },
    calcularTotalAPagar: function () {
        let totalAPagar = 0;
        for (const produto of this.produtos) {
            totalAPagar += produto.qtd * produto.precoUnit;
        }
        return totalAPagar / 100;
    },
    calcularDesconto: function () {
        const totalItens = this.calcularTotalDeItens();
        const totalAPagar = this.calcularTotalAPagar();

        let descontoItemMaisBarato = 0;
        if (totalItens > 4) {
            let menorPreco = this.produtos[0].precoUnit;
            let indexMenorPreco = 0;
            for (let i = 1; i < this.produtos.length; i++) {
                if (this.produtos[i].precoUnit < menorPreco) {
                    menorPreco = this.produtos[i].precoUnit;
                    indexMenorPreco = i;
                }
            }
            descontoItemMaisBarato = this.produtos[indexMenorPreco].precoUnit / 100;
        }

        let descontoPorValor = 0;
        if (totalAPagar > 100) {
            descontoPorValor = totalAPagar * 0.1;
        }

        return Math.max(descontoItemMaisBarato, descontoPorValor);
    },
};

const novaBermuda = {
    id: 2,
    nome: "Bermuda",
    qtd: 3,
    precoUnit: 5000,
};

carrinho.addProduto(novaBermuda);
carrinho.imprimirResumo();

const novoTenis = {
    id: 3,
    nome: "Tenis",
    qtd: 1,
    precoUnit: 10000,
};

carrinho.addProduto(novoTenis);
carrinho.imprimirResumo();
