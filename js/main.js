/*jslint browser: true*/
/*global $, jQuery, alert*/

/*jshint ignore:start */
// ----------------- Concat JavaScript with Grunt later. It uses the ISC license, so no issues there.
/*! Dentist.js 2015-04-06 */
!function(){var a={delimiter:"&",keyValueSeparator:"=",startAfter:"?"};String.prototype.extract=function(b){function c(a){return/^(\-|\+)?([0-9]+|Infinity)$/.test(a)?Number(a):0/0}if(!(this.length<=1)){var d,e,f,g=void 0,b=b||{},h=[],i={};d=b.delimiter||a.delimiter,e=b.keyValueSeparator||a.keyValueSeparator,f=b.startAfter||a.startAfter,g=c(b.limit)?b.limit:void 0;var j=this.indexOf(f),k=this.indexOf(e);if(!(0>k)){var l=0>j?this:this.substring(j+1);h=l.split(d,g);for(var m,n=0,o=h.length;o>n;n++){m=h[n].split(e,2);var p=m[1];i[m[0]]=c(p)?c(p):p}return i}}}}();
// -----------------------------------------------------
/*jshint ignore:end */

$(document).ready(function () {
    'use strict';

    // Extracts params with DentistJS
    var params = document.URL.extract();
    //alert(params.credit + " " + params.pickup); // Tested and it is working.

    // Order Form params.
    if(params !== undefined) {
        switch(params.pickup) {
            case 'salem':
                $('#pickup-country-club').attr('checked', 'checked');
                break;
            case 'kernersville':
                $('#pickup-kernersville').attr('checked', 'checked');
                break;
            case 'bivouac':
                $('#pickup-east-winston').attr('checked', 'checked');
                break;
        }
    }

    // Contact Form params.
    if(params !== undefined) {
        switch(params.contact) {
            case 'george':
                $('#contact').val('george');
                break;
            case 'chad':
                $('#contact').val('chad');
                break;
            case 'rodney':
                $('#contact').val('rodney');
                break;
        }
    }

    // Validation for the order form. This is to help prevent the redirect and check the fields.
    $('#orderForm').validate({
        debug: true,
        meta: "validate",
        rules: {
            'entry.2117752079': 'required',
            'entry.7421287028': 'required',
            'entry.667369012': {
                required: true,
                minlength: 2
            },
            'entry.1344254577': {
                email: true
            },
            'entry.205827085': {
                required: true,
                phoneUS: true
            },
            'entry.2067829795': {
                required: true,
                min: 1,
                max: 10
            }
        },
        messages: {
            'entry.2117752079': 'Please select a pickup location.',
            'entry.7421287028': 'Please select one.',
            'entry.667369012': {
                required: 'A name is required.',
                minlength: 'Please provide at least two initials.'
            },
            'entry.1344254577': {
                email: 'Please provide a valid email.'
            },
            'entry.205827085': {
                required: 'A phone number is required.',
                phoneUS: 'A US phone number is required.'
            },
            'entry.2067829795': {
                required: '1-10 butts are required.',
                min: '1-10 butts are required.',
                max: '1-10 butts are required.'
            }
        },
        errorPlacement: function (error, element) {
            if (element.attr('name') === 'entry.2117752079') {
                $('#pickup-error').html(error);
            }
            if (element.attr('name') === 'entry.7421287028') {
                $('#lodge-credit-error').html(error);
            }
            if (element.attr('name') === 'entry.667369012') {
                $('#name-error').html(error);
            }
            if (element.attr('name') === 'entry.1344254577') {
                $('#email-error').html(error);
            }
            if (element.attr('name') === 'entry.205827085') {
                $('#phone-error').html(error);
            }
            if (element.attr('name') === 'entry.2067829795') {
                $('#amount-error').html(error);
            }
        },
        submitHandler: function (form) {
            $('#orderForm').toggle();
            form.submit();
            $('.hidden-message').show();
        }
    });

    // Load up the shortest version and then the longer versions for larger screen sizes.
    var lead370 = $('.lead').text(),
        lead570 = "Alright! It's time to sell some butts and we have plenty of BBQ coming! The pickup will be on Saturday, April 25th at 3 different locations. This is some of the best Hickory Smoked BBQ around!",
        leadLong = "Alright! It's time to sell some butts and we have plenty of BBQ coming! The pickup will be on Saturday, April 25th at 3 different locations. This is some of the best BBQ around! Hickory smoked, juicy, with a pint of that delicious sauce. If it's anything like last time then we'll be slow cookin' through the night with 'em ready by morning.",
        navShort = $('.navbar-brand').text(),
        navLong = navShort + " Fundraiser",
        jumboHeading = "<h1>It's BBQ Time!</h1>";

    // TODO: jumboHeading shows on Android 3.2.1
    // Detect pagesize on load and make changes accordingly
    if ($(this).width() > 370 && $(this).width() < 570) {
        $('.lead').text(lead570);
    } else if ($(this).width() > 570) {
        $('.lead').text(leadLong);
    }

    if ($(this).width() > 370) {
        $('.navbar-brand').text(navLong);
        $('.jumbotron.main').prepend(jumboHeading);
    }

    //$('.lead').text(leadLong);
    $(window).resize(function() {
        if ($(this).width() > 370 && $(this).width() < 570) {
            $('.lead').text(lead570);
        } else if ($(this).width() > 570) {
            $('.lead').text(leadLong);
        } else {
            $('.lead').text(lead370);
        }

        if ($(this).width() > 370) {
            $('.navbar-brand').text(navLong);
            // Only inject the heading if it doesn't exist.
            if(!$('.jumbotron h1').length){
                $('.jumbotron.main').prepend(jumboHeading);
            }
        } else {
            // Fall back to defaults. (I'm always setting the shortest version in the HTML.)
            $('.navbar-brand').text(navShort);
            $('.jumbotron.main h1').remove();
        }
    });
});
