/*global $, document, Chart, LINECHART, data, options, window*/
$(document).ready(function () {

    'use strict';


    // ------------------------------------------------------- //
    // Bootstrap Select initialization
    // ------------------------------------------------------ //
    $('.listing-categories').selectpicker();


    // ------------------------------------------------------- //
    // Fixing Navbar
    // ------------------------------------------------------ //
    var topbarHeight = $('.top-bar').outerHeight();
    $(window).on('scroll', function () {

        if ($(window).scrollTop() >= topbarHeight) {
            $('.navbar').addClass('fixed-top');
            $('body').addClass('active');
        } else {
            $('.navbar').removeClass('fixed-top');
            $('body').removeClass('active');
        }
    });


    // ------------------------------------------------------- //
    // Latest Listings Slider
    // ------------------------------------------------------ //
    $('.latest-listings-slider').owlCarousel({
        loop: true,
        margin: 20,
        dots: true,
        nav: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: false
            },
            768: {
                items: 2,
                nav: false
            },
            1000: {
                items: 3,
                nav: true,
                loop: false
            }
        }
    });

    // ------------------------------------------------------- //
    // Adding fade effect to dropdowns
    // ------------------------------------------------------ //

    $.fn.slideDropdownUp = function () {
        $(this).fadeIn().css('transform', 'translateY(0)');
        return this;
    };
    $.fn.slideDropdownDown = function () {
        $(this).css('transform', 'translateY(30px)').fadeOut();
        return this;
    };

    $('.dropdown').on('show.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDropdownUp();
    });
    $('.dropdown').on('hide.bs.dropdown', function () {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDropdownDown();
    });


    // ------------------------------------------------------- //
    // Add Rate
    // ------------------------------------------------------ //
    $('.add-rate .rate li').hover(function () {
        $(this).css('color', '#f4bf21');
        $(this).prevAll().css('color', '#f4bf21');

    }, function () {
        $(this).css('color', '#ddd');
        $(this).prevAll().css('color', '#ddd');
    });


    // ---------------------------------------------- //
    // Scroll Spy
    // ---------------------------------------------- //
    $('.link-scroll').bind('click', function (e) {
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 180
        }, 1000);
        e.preventDefault();
    });

    // ------------------------------------------------------ //
    // For demo purposes, can be deleted
    // ------------------------------------------------------ //

    var stylesheet = $('link#theme-stylesheet');
    $("<link id='new-stylesheet' rel='stylesheet'>").insertAfter(stylesheet);
    var alternateColour = $('link#new-stylesheet');

    if ($.cookie("theme_csspath")) {
        alternateColour.attr("href", $.cookie("theme_csspath"));
    }

    $("#colour").change(function () {

        if ($(this).val() !== '') {

            var theme_csspath = 'css/style.' + $(this).val() + '.css';

            alternateColour.attr("href", theme_csspath);

            $.cookie("theme_csspath", theme_csspath, { expires: 365, path: document.URL.substr(0, document.URL.lastIndexOf('/')) });

        }

        return false;
    });


});
