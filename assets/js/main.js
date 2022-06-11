$(function(){
    // loading
    var $progress = $('#progress'),
        $progressBar = $progress.find('.progress_bar'),
        $progressTest = $progress.find('.progress_text'),
        timer = setInterval(loadProgress, 1000/60),
        loaded = 0;

    function loadProgress(){
        loaded++
        $progressBar.css({width: loaded+'%'});
        $progressTest.text(Math.ceil(loaded)+'%')

        if (loaded == 100){
            clearInterval(timer);
            
            $progressBar.add($progressTest).delay(500).animate({opacity:0}, 250, function(){
                $progress.animate({right: '-100%'}, 500);
            })
        }
    }//loadProgress

    //fullpage-plugin
    $('#fullpage').fullpage({
        autoScrolling: false,
        navigation: true,
        navigationPosition: 'right', 
        afterLoad: function(anchorLink, index){

        },
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){

        },
 
    });//fullpage

    var executed = false;

    //scroll function
    $(window).scroll(function(){
        let scrollTop = $(window).scrollTop();
        
        // var profile_section = $('#profile').offset().top - 150;
        var profile_section = $('#profile').offset().top - $(window).innerHeight()/2;
        var animate_target = $('.profile_rt_up strong');

        if ( scrollTop >= profile_section){
            animate_target.addClass('animamte_fadeInUp');
            
        }//profile_section scroll

        var skill_section = $('#skill').offset().top;
        var skill_animate = $('.skill_animate');
        
        if (!executed){
            if(scrollTop >= skill_section){
            
                $('#skill').css('background', '#252525');
                $('#project').css('background', '#252525');
                

                skill_animate.each(function(index){
                    var current = $(this);
                    var progressRate = current.attr('data-num'),
                        progressBar = current.find('.skill_bar span'),            
                        progressText = current.find('.skill_num');

                    $({percent: 0}).animate({percent: progressRate},{
                        duration: 1500,
                        progress: function(){
                            var progress = this.percent;
                            progressBar.css("width", progress+'%');
                            progressText.text(parseInt(progress)+'%');
                        }                        
                    });
                });

                executed = true;
            }
        }//skill_section scroll

        var project_list = $('.project_list_wrap ul li');
        project_list.each(function(index){
            var target_offset = $(this).offset().top - 400;
            if(scrollTop >= target_offset){
                project_list.eq(index).addClass('active');
            }else {
                project_list.eq(index).removeClass('active');
            }
        })//project_list scroll

        if(scrollTop >= skill_section){
            $('.logo').addClass('active');
            $('#fp-nav ul li a span').css('background', '#fff');
        }
        else {
            $('.logo').removeClass('active');
            $('#fp-nav ul li a span').css('background', '#333');
        }//rather than skill_section

    })//scroll



    //MouseEffect
    const cursor = $(".cursor");
    $(window).mousemove(function(e){
        gsap.to(cursor, {duration: 0.2, left: e.pageX-5, top: e.pageY-5});
    });

    //MouseEffect - Hover Action
    $("article").add('.contact_list_wrap a').hover(function(){
        cursor.addClass("active_purple");
    }, function(){
        cursor.removeClass("active_purple");
    }); //active_purple
    $(".project_img").add('.logo').hover(function(){
        cursor.addClass("active_pink");
    }, function(){
        cursor.removeClass("active_pink");
    });//active_pink
    $('.animate p').hover(function(){
        $(this).addClass('active');
    }, function(){
        $(this).removeClass("active");
    });//active class

})//document ready