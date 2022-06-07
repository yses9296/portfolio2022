$(function(){
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
        
        var profile_section = $('#profile').offset().top - 150;
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
        }
        else {
            $('.logo').removeClass('active');
        }//logo scroll
    })



    //MouseEffect
    const cursor = $(".cursor");
    $(window).mousemove(function(e){
        gsap.to(cursor, {duration: 0.2, left: e.pageX-5, top: e.pageY-5});
    });

    //MouseEffect - Hover Action
    $("article").add('.contact_list_wrap a').hover(function(){
        cursor.addClass("active_blue");
    }, function(){
        cursor.removeClass("active_blue");
    });
    $(".project_img").add('.logo').hover(function(){
        cursor.addClass("active_orange");
    }, function(){
        cursor.removeClass("active_orange");

    });
    

        
})//document ready