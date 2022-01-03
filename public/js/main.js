var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    incializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#reset").click(reiniciaJogo);

});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanhoFrase");
    tamanhoFrase.text(numPalavras);
}

function incializaContadores(){
    campo.on("input", function(){
        var conteudo = campo.val();
        var qtPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtPalavras);
    
        var qtCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtCaracteres);
    });
}

function inicializaCronometro(){
    var tempoRestante = $("#tempo").text();
    campo.one("focus", function(){
        $("#reset").attr("disabled", true);
        var cronometroId = setInterval(function(){
            tempoRestante--;
            $("#tempo").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(cronometroId);
                finalizaJogo();
            }
   },1000);
});

}

function inicializaMarcadores(){
    var frase = $(".frase").text();
    campo.on("input",function(){
    var digitado = campo.val();
    var comparavel = frase.substr(0, digitado.length);
    
    if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
    } else{
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
    }
});
}

function finalizaJogo(){
    campo.attr("disabled", true);
    $("#reset").attr("disabled", false);
    campo.toggleClass("campo-desativado");
    inserePlacar();
                
}

function inserePlacar(){
    var tabela = $(".placar").find("tbody");
    var usuario = "Douglas";
    var numPalavras = $("#contador-palavras").text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>";

    var linha = "<tr>" + 
                    "<td>"+ usuario +"</td>"+
                    "<td>"+ numPalavras +"</td>"+
                    "<td>"+ botaoRemover +"</td>"+
                "</tr>";

    tabela.append(linha);
}

$(".botao-remover").click(function(event){
    event.preventDefault();
    $(this).parent().parent().remove();
})



function reiniciaJogo(){
    campo.attr("disabled",false);
    campo.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-verde");
    campo.removeClass("borda-vermelha");
}

