function rebind_img_js_detalhe(){



    $('img.js-detalhe').hover(
    // $('.container-produtos img.js-detalhe').hover(
        function(){

            var obj = $(this);

            if(obj.data('src1')){
                var indice = new Number(obj.data('indice'));
                var src = 'src' + indice;
                var newImg = new Image;

                if(!obj.data(src)){
                    src = 'src1';
                    indice = 1;
                }
                else {
                    indice ++;
                }

                obj.data('indice', indice);

                obj.animate({opacity:.9},100);

                if(!obj.data('load')){

                    newImg.onload = function() {
                        obj.data('load',1);
                        obj.attr('src', this.src);
                        obj.animate({opacity:1},100);
                    };

                    newImg.src = obj.data(src);

                }
                else {
                    obj.attr('src', obj.data(src));
                    obj.animate({opacity:1},100);
                }

            }
        }
        ,function(){
            var obj = $(this);
            if(obj.data('src1')){
                obj.attr('src', obj.data('src'));
            }
        }
    );

    $("img.lazy").lazyload({
        effect:"fadeIn"
        ,threshold:200
    });

}

function formataMoeda(objTextBox, e){

    var SeparadorMilesimo = '.' ;
    var SeparadorDecimal = ',' ;
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';

    //var whichCode = (window.Event) ? e.which : e.keyCode;

    var whichCode = (document.all) ? e.keyCode : e.which ;

    //alert(whichCode);

    if ((whichCode == 13) || (whichCode == 0) || (whichCode == 8))
        return true;

    key = String.fromCharCode(whichCode); // Valor para o c�digo da Chave
    if (strCheck.indexOf(key) == -1) return false; // Chave inv�lida
    len = objTextBox.value.length;
    for(i = 0; i < len; i++)
        if ((objTextBox.value.charAt(i) != '0') && (objTextBox.value.charAt(i) != SeparadorDecimal)) break;
    aux = '';
    for(; i < len; i++)
        if (strCheck.indexOf(objTextBox.value.charAt(i))!=-1) aux += objTextBox.value.charAt(i);
    aux += key;
    len = aux.length;
    if (len == 0) objTextBox.value = '';
    if (len == 1) objTextBox.value = '0'+ SeparadorDecimal + '0' + aux;
    if (len == 2) objTextBox.value = '0'+ SeparadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        objTextBox.value = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            objTextBox.value += aux2.charAt(i);
        objTextBox.value += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return false;
}

function formataMoedaValor(valor){
    var SeparadorMilesimo = '.' ;
    var SeparadorDecimal = ',' ;
    var sep = 0;
    var key = '';
    var i = j = 0;
    var len = len2 = 0;
    var strCheck = '0123456789';
    var aux = aux2 = '';

    valor = valor.replace(".","");

    aux = valor;
    len = aux.length;
    if (len == 0) valor = '';
    if (len == 1) valor = '0'+ SeparadorDecimal + '0' + aux;
    if (len == 2) valor = '0'+ SeparadorDecimal + aux;
    if (len > 2) {
        aux2 = '';
        for (j = 0, i = len - 3; i >= 0; i--) {
            if (j == 3) {
                aux2 += SeparadorMilesimo;
                j = 0;
            }
            aux2 += aux.charAt(i);
            j++;
        }
        valor = '';
        len2 = aux2.length;
        for (i = len2 - 1; i >= 0; i--)
            valor += aux2.charAt(i);
        valor += SeparadorDecimal + aux.substr(len - 2, len);
    }
    return valor;
}

function formata(v) {
    var s = new String(v);
    if(s.indexOf('.')==-1) {
        return float2moeda(s)+',00';
    }
    else {
        var x = s.split('.');
        if(x[1].length>=2){
            return float2moeda(x[0])+','+x[1].substr(0,2);
        }
        else{
            return float2moeda(x[0])+','+x[1]+'0';
        }
    }
}

function float2moeda(num){
    x = 0;

    if(num < 0){
        num = Math.abs(num);
        x = 1;
    }

    if(isNaN(num)) num = "0";

    num = Math.floor((num*100+0.5)/100).toString();

    for (var i = 0; i < Math.floor((num.length-(1+i))/3); i++)

        num = num.substring(0,num.length-(4*i+3))+'.'+num.substring(num.length-(4*i+3));
    ret = num;

    if (x == 1) ret = ' - ' + ret;

    return ret;
}

function toFloat(str){
    str = new String(str);
    str = new Number(str.replace(',','.'));
    return str;
}

$(document).ready(function(){

	// Fecha os alertas
	var display = $('.alertas').css('display');

	if(display == 'block'){
		setTimeout(function(){
			$('.alertas').hide('slow');
		},6000)
	}

	function redimensionar(){

		var height = $('.site').height();

		if(height < 640){
			var cH = $(document).height();
			$('.site').css('height', cH-303);
		}

		/*
		console.log('Largura do document: ' + $(document).width());
		console.log('Largura do window: ' + $(window).width()); // tamanho da janela
		console.log('Tamanho da imagem: ' + $('div.container-categorias div.det').width());
		*/

		var tamanhoJanela = $(window).width();

		if( tamanhoJanela > 1470){
			$('div.container-categorias div.det').css('right', 0);
		}
		else {
			var tamanhoImagem = $('div.container-categorias div.det').width();
			var tamanhoSite = 980;
			var alinhamento = 14;
			var right = (tamanhoImagem - ((tamanhoJanela - tamanhoSite) / 2)) * -1 ;
			right = right + alinhamento;
			$('div.container-categorias div.det').css('right', right );
		}

	}

	$(window).bind('resize', function(){
		redimensionar();
	});

	// window.onresize = redimensionar;
	redimensionar();

    $('#menunav .menuprodutos').bind('click', function(){
        if($('#menunav .menuprodutos').data('click')){
            return true;
        }
        $('#menunav .menuprodutos').data('click', true);
        $('#menunav2').slideToggle();
        return false;
    });

    rebind_img_js_detalhe();

    function swiperightHandler( event ){
        // console.log(1);

        var obj = $(event.target);
        // console.log(obj);

        if(obj.data('src1')){
            var indice = new Number(obj.data('indice'));
            var src = 'src' + indice;
            var newImg = new Image;

            if(!obj.data(src)){
                src = 'src1';
                indice = 1;
            }
            else {
                indice ++;
            }

            obj.data('indice', indice);

            newImg.onload = function() {
                obj.attr('src', this.src);
                obj.animate({opacity:1},100);
            };

            obj.animate({opacity:.9},100);
            newImg.src = obj.data(src);

        }

    }

    $('img.js-detalhex').on('swiperight', swiperightHandler);

    /*
    var delay=1000, setTimeoutConst;
    $('img.js-detalhe').bind('mousemove',
        function(){

            var obj = $(this);

            if(obj.data('src1')){

                setTimeoutConst = setTimeout(function(){

                    var indice = new Number(obj.data('indice'));
                    var src = 'src' + indice;
                    var newImg = new Image;

                    if(!obj.data(src)){
                        src = 'src1';
                        indice = 1;
                    }
                    else {
                        indice ++;
                    }

                    obj.data('indice', indice);

                    newImg.onload = function() {
                        obj.attr('src', this.src);
                    }

                    newImg.src = obj.data(src);

                }, delay);

            }
        }
    );
    */

});

$(document).ready(function(){
    if(typeof Swiper === "function"){
    var Scomprejunto = new Swiper('#swiper-comprejunto', {
     slidesPerView: 1,
     spaceBetween: 0,
     breakpoints:{
         991:{
             slidesPerView: 1,
             spaceBetween: 0,
         }
     },
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     }
     });
    var ScomprejuntoMob = new Swiper('#swiper-comprejuntomobile', {
     slidesPerView: 1,
     spaceBetween: 0,
     breakpoints:{
         991:{
             slidesPerView: 1,
             spaceBetween: 0,
         }
     },
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     }
     });

    var SdetalheTec = new Swiper('#swiper-detalhe-tecnico', {
     slidesPerView: 1,
     spaceBetween: 0,
     breakpoints:{
         991:{
             slidesPerView: 1,
             spaceBetween: 0,
         }
     },
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     }
     });

    var SdetalheTecMob = new Swiper('#swiper-detalhe-tecnico-mob', {
     slidesPerView: 1,
     spaceBetween: 0,
     breakpoints:{
         991:{
             slidesPerView: 1,
             spaceBetween: 0,
         }
     },
     navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
     }
     });
    }

    modo_uso = $(".json-modo-uso").html();
    
    if(modo_uso){
        if(modo_uso.length > 125){
            reduzir_txt();
        }
    }
 });

function expandir_txt(){
    txt = $("#modo_uso_full").val();
    txt += "<span class='btn-dec-tec' onclick='reduzir_txt()'>   ver menos</span>";
    $(".json-modo-uso").html(txt);

}

function reduzir_txt(){
    modo_uso = $(".json-modo-uso").html();
    string = modo_uso.substr(0,125);
    string += " <span class='btn-dec-tec' onclick='expandir_txt()'>...ver mais</span>";
    $(".json-modo-uso").html(string);
}

 function troca_img_tec(pos,type){
     if(type == 1){
        width = document.getElementById('swip_'+pos).offsetWidth;
        if(pos == 0){
            // space = width;
            space = 0;
        }else{
            space = width * pos;
        }
         var swip =  document.getElementById('swip_det');
         translateM = "translate3d(-"+space+"px,0px,0px)";
         swip.style.transform = translateM;
    }else{
        width = document.getElementById('swip-mob_'+pos).offsetWidth;
        if(pos == 0){
            // space = width;
            space = 0;
        }else{
            space = width * pos;
        }
        var swip =  document.getElementById('swip_det-mob');
        translateM = "translate3d(-"+space+"px,0px,0px)";
        swip.style.transform = translateM;
    }

}

 function open_carac_tec(){

     if($("#carac-tec-mob").hasClass("Openned")){
         $("#carac-tec-mob").slideUp();
         $("#carac-tec-mob").removeClass("Openned");
         $(".title_det_tec_mob").css("border-radius",'45px');
         $("#img_dl_div_mob").show();
         
     }else{
        $("#carac-tec-mob").slideDown();
        $("#carac-tec-mob").addClass("Openned");
        $(".title_det_tec_mob").css("border-radius",'0px');
        $("#img_dl_div_mob").hide();
        
     }
 }

 function setCounts(el){
	_count = eval($(el).data("count"));
	_caracs = eval(el.value.length);
	_name = el.name.replace(/[\[\]]/g,"_");
	_rest = (_count-_caracs)<0?0:(_count-_caracs);
	if($("."+_name).size()>0){
		$("."+_name).html("Caracteres restantes : "+_rest+"");
	}else{
		$(el).after("<p class='"+_name+"'>Caracteres restantes : "+_rest+"</p>");
	}
}

    /* CONTADOR de CARACTER v1.0 By Naza */
$(document).ready(function(){

    $("._count").each(function(){ setCounts(this);});
    
	$("._count").bind("keyup",function(){
        setCounts(this);
		if(_caracs>=_count)this.value = this.value.substring(0,_count);
    });
})

function grid_instagram(id,max){
    max = parseInt(max); 
    page_atual = parseInt(page_atual); 
    page_atual = $("#page_atual").val();
    console.log(typeof page_atual);

    switch(id){
        case 'first':
            page_atual = 1;
            $("#page_atual").val(page_atual);
        break;

        case 'prev':
            if(page_atual > 1){
                page_atual --;
                $("#page_atual").val(page_atual);
            }
        break;

        case 'next':
            if(page_atual < max){
                console.log('passou');
                page_atual ++;
                $("#page_atual").val(page_atual);
            }
        break;

        case 'last':
            page_atual = max;
            $("#page_atual").val(page_atual);
        break;
    }

    $.ajax({
        url : "instagram_grid"
        ,method : "POST"
        ,data : {page : page_atual}
        ,BeforeSend:function(){
            $('#div_insta').html('');
        }
        ,success:function(out){
            $('#div_insta').html(out);
            height_fix("instagram_download");
        }

    })
    // $(".page_span").each(function(){
    //     $(this).html("Pagina "+page_atual+" de "+max);
    // })
    $(".page_span").html("Pagina "+page_atual+" de "+max);
}

function height_fix(classe){
    width = $(window).width();
    if(width > 991){
        height = 320; // caso queria deixar um value minimo caso não setar 0;
    }else if(width )
    $("."+classe).each(function(){
        value = $(this).height();
        if(value > height){
            height = value;
        }
    })
    $("."+classe).css("height",height);
}