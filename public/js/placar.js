$("#btn-placar").click(mostraPlacar);
$("#btn-sync").click(sincronizaPlacar);

function inserePlacar(){
    var tabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavras").text();
    
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remover").click(removeLinha);

    tabela.append(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html, body").animate(
        {
            scrollTop: posicaoPlacar+"px"
        }, 1000);

}

function novaLinha(usuario, numPalavras){
    //Ao transformar uma string do HTML em um objeto no nosso JSON, eu posso incluir eventos como click, focus 
    
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(numPalavras);
    var colunaRemover = $("<td>");
    
    var link = $("<a>").addClass("botao-remover").attr("href", "#");
    var icone = $("<i>").addClass("small").addClass("material-icons").text("delete");

    link.append(icone);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;

}

function removeLinha(){
    event.preventDefault();
    var linha = $(this).parent().parent();

    linha.fadeOut(1000);
    setTimeout(function(){
        linha.remove();
    }, 1000);
    
}

function mostraPlacar(){
    $(".placar").stop().slideToggle(600);
}

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        console.log(usuario);
        var palavras = $(this).find("td:nth-child(2)").text();
        console.log(palavras);

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);
    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("Salvou o placar no servidor");
        $(".tooltip").tooltipster("open");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar.");

    }).always(function(){
        setTimeout(function(){
            $(".tooltip").tooltipster("close");
        }, 1500); 
    });

}

function atualizaPlacar(){
    $.get("http://localhost:3000/placar", function(data){
        
        $(data).each(function(){
            var linha =novaLinha(this.usuario, this.pontos);
            linha.find(".botao-remover").click(removeLinha);
            $("tbody").append(linha);
        })
    });
}
