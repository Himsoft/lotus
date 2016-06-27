
    var permutation=function(){
        if($(window).width()>767){
            $('.why-we-item:odd').each(function(){
                var $img=$(this).children('.image-item');
                $img.addClass('lefted');
                $(this).children('.caption-item').addClass('righted');
                $(this).children('.image-item').remove();
                $(this).prepend($img);
            });
            
            
            $('.project-item:odd').each(function(){
                var $img=$(this).children('.image-item');
                $img.addClass('righted');
                $(this).children('.caption-item').addClass('lefted');
                $(this).children('.image-item').remove();
                $(this).append($img);
            });
            if($(window).width()<1920){
                if($(window).width()>767){
                    var k=1;
                    if($(window).width()<1200) k=0.855;
                    if($(window).width()<992) k=0.702;
                    $('.why-we-item .image-item img').each(function(){
                        $(this).css('width','');
                         var img_w=$(this).width();
                         $(this).css('width',(img_w*k)+'px');
                   });
                }
            }
        }
        var h=$('footer').height();
        $('#content-wrapper').css('padding-bottom',h+'px').css('margin-bottom','-'+h+'px');
    }

    var recalc=function(){
        var max_height=0;
        $('.menu-block-inner').each(function(){
            if($(this).find('.row').height()>max_height) max_height=$(this).find('.row').height();
            $('.menu-block-inner').height(max_height);
        });       
    }

    var ofcet=function(){
        var offset = $('.news-section .carousel .carousel-inner .item.active img').height();
        $('.news-section .carousel .carousel-indicators').css('top',(offset-40)+'px');
        $('.news-section .carousel .carousel-control').css('top',(offset-55)+'px');
        
        console.log(offset);
    }
    
    var slideInner=function(){
        if(!$('.inner-slider').hasClass('fulscreen-slider')){
            //var rozn=$('.item.active .carousel-image img').height()-$('.item.active .carousel-image').height();
            //if(rozn>0) 
            $('.item .carousel-image img').css('margin-top','-'+($('.item.active .carousel-image .container').height()+25)+'px');
        }else{
            $('.item .carousel-image').height($(window).height());
        }
        var h=$('footer').height();
        $('#content-wrapper').css('padding-bottom',h+'px').css('margin-bottom','-'+h+'px');
    }

$(document).ready(function(){/* jQuery toggle layout */
    permutation();
        // Инициалиация
        var video = $("#main-video");

//    function vidplay() {
//       if (video.paused) {
//          video.play();
//       } else {
//          video.pause();
//       }
//    }        
//
    $('.show-video').click(function(){
        $('.top-video-container').fadeOut(500);
        $('.main-video-container').fadeIn(500);

        setTimeout(function(){
         video.get(0).play();
        }, 1100);

    });       
        
        video.bind("ended", function(){
            $('.top-video-container').fadeIn(500);
            $('.main-video-container').fadeOut(500);       
        });



    $('.nav li').hover(function(){
        $(this).find('.sub-menu:not(:visible)').slideDown(300);
        }, function(){
        $(this).find('.sub-menu:visible').slideUp(300);
    });

    $('.nav .sub-menu li').hover(function(){
        $(this).children('ul:not(:visible)').animate({ opacity: 1,width: "show"},300);
        }, function(){
        $(this).children('ul:visible').animate({ opacity: "hide",width: "hide"},300);
    }); 
    
    $('.news-section .carousel').on('slid.bs.carousel', function () { ofcet(); });

    if($('#slider1').length){
         $('#slider1').sliderRM({
            bar: true,
            nav: false,
            margin: 17,
            responsive:{
                0:{
                    items: 3,
                },
                480:{
                    items: 3,
                },
                768:{
                    items: 3,
                },
                980:{
                    items: 4,
                },
            },
        });
    }
        $('.slider-rm-ul li').click(function(){
            var sl=$(this).attr('data-slide-to')-1;
            $('#slider1').trigger('goto-slider', (sl));
            $('.fulscreen .item-num').text((sl+2));
            if($('.inner-slider').hasClass('fulscreen-slider')){
                $('.inner-slider .container:not(:last-child)').css('max-width',$('.item.active .carousel-image img').width()+'px');
            }else{
                $('.inner-slider .container:not(:last-child)').css('max-width','');
            }
        });
        $('.fulscreen').click(function(){
            if($('.inner-slider').hasClass('fulscreen-slider')){ 
                $('.inner-slider').removeClass('fulscreen-slider');
                $('.item .carousel-image').css('max-height','').css('height','');
                $('.inner-slider .container:not(:last-child)').css('max-width','');
            } 
            else{ 
                $('.inner-slider').addClass('fulscreen-slider');
                $('.item .carousel-image').css('max-height','none').height($(window).height());
                $('.inner-slider .container:not(:last-child)').css('max-width',$('.item.active .carousel-image img').width()+'px');
            }
        });
        //slideInner();
        $(window).resize(function(){
            permutation();
            //slideInner();
        });
    
    $('.social-likes_ready .social-likes__counter_empty').text('0');

    $('#tab-search .btn-search').click(function(){
        if($(this).hasClass('active')){
            if($('#tab-search .srch-term').val()==''){
                $(this).removeClass('active');
                $('#tab-search .srch-term').animate({maxWidth: "60px"}, 800);
                $('#subnav .nav-menu').animate({width: "90%"}, 800);
                return false;
            }
        }else{
            $(this).addClass('active');
            $('#subnav .nav-menu').animate({width: "75%"}, 800);
            $('#tab-search .srch-term').animate({maxWidth: "247px"}, 800).focus();
            return false;
        }
    });
    
    $('.add_more a').click(function(e){
        e.preventDefault();
        var $item=$(this).parent().parent().find('.item:first-child').clone(true);
        $item.find('.anketa-form-item input').val('');
        $item.find('.anketa-form-item select').val('');
        $item.find('.anketa-form-item textarea').val('');
        $item.appendTo($(this).parent().parent().find('.parent_container'));
    });
    
    $('.lang-block .dropdown-menu a').click(function(e){
        e.preventDefault();
        $('.lang-block > a .lang').text($(this).text());
    });
    
    $('.carousel').carousel({
		interval: 0
	});
    ofcet();
    $(window).load(function(){ofcet();});
    if($(window).width()>767){
        recalc();
    }
    $(window).resize(function () {
        ofcet();
        if($(window).width()>767){
            recalc();
        }
    });
     $(window).scroll(function () {
        if($(window).width()>767){
            if ($(this).scrollTop() > 50) {
                //$('#drop-menu').fadeIn();
            } else {
                //$('#drop-menu').fadeOut();
            }
            
            $("#drop-menu a:not(.back-to-top)").each(function(){
                var id  = $(this).attr('href');
                if(($(id).offset().top-180)<=$(window).scrollTop()){
                    $('#drop-menu .rhs-circle.active').removeClass('active');
                    $(this).parents('li').find('.rhs-circle').addClass('active');
                }else{
                    $(this).parents('li').find('.rhs-circle.active').removeClass('active');
                }
            });
            //console.log($(window).scrollTop()+' == '+($(document).height() - $(window).height()));
            if  ($(window).scrollTop() >= ($(document).height() - $(window).height())){
                $('#drop-menu .rhs-circle.active').removeClass('active');
                $('#drop-menu ul li:last-child .rhs-circle').addClass('active');
            }
        }    
     });

	$("#drop-menu").on("click","a", function (event) {
	   if(!$(this).hasClass('back-to-top')){
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: (top-170)}, 800);
       } 
	});
//    $('.rhs-circle').hover(function(){
//        $(this).parent().find('.rhs-links').animate({width: "+=300"}, 800 ).css({position:''});
//    },function(){
//        $(this).parent().find('.rhs-links').animate({width: "-=300"}, 800 );
//    });

        // scroll body to 0px on click
        $('.back-to-top').click(function () {
            //$('#drop-menu').tooltip('hide');
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
 
        $('#drop-menu').tooltip('show');
    
    $('#btnToggle').click(function(){
      if ($(this).hasClass('on')) {
        $('#main .col-md-6').addClass('col-md-4').removeClass('col-md-6');
        $(this).removeClass('on');
      }
      else {
        $('#main .col-md-4').addClass('col-md-6').removeClass('col-md-4');
        $(this).addClass('on');
      }
    });
});