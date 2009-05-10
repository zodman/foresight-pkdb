var pkdb = function() {
    var initialQueryContents = 'What are you looking for?';
    return {
        initialize: function() {
            var prepareForInput = function() {
                    $(this)
                       .removeClass('initialInputText')
                       .val('');
            };

            $('#q')
                .addClass('initialInputText')
                .val(initialQueryContents)
                .click(prepareForInput)
                .focus(prepareForInput)
                .parent('form')
                    .submit(function() {
                        if ($(this).val() == initialQueryContents) {
                            $(this).val('');
                        }
                    })
                .end();

        }, /* end initializeIndex */

    };

} ();

$(document).ready( function () { pkdb.initialize(); } );

   
