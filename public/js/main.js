var tempoInicial = $("#tempo").text();
var campo = $(".campo-digitacao");

$(function(){
    atualizaTamanhoFrase();
    incializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#reset").click(reiniciaJogo);
    $(".botao-remover").click(removeLinha);

});

function atualizaTamanhoFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanhoFrase");
    tamanhoFrase.text(numPalavras);
}

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo").text(tempo);
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
    campo.one("focus", function(){
        var tempoRestante = $("#tempo").text();
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
    campo.on("input",function(){
    var frase = $(".frase").text();
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

