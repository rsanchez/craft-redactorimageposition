/**
 * Redactor Image Width plugin for Craft CMS
 *
 * Redactor Image Width JS
 *
 * @author    Rob Sanchez
 * @copyright Copyright (c) 2017 Rob Sanchez
 * @link      https://github.com/rsanchez
 * @package   RedactorImageWidth
 * @since     1.0.0
 */

if (!RedactorPlugins) var RedactorPlugins = {};

RedactorPlugins.imageWidth = function () {
    return {
        init: function () {
            this.imageWidth.positionTemplate = String()
            + '<section>'
            + '    <label>Width</label>'
            + '    <input type="text" id="redactor-image-width">'
            + '</section>';

            this.imageWidth.events();
        },

        events: function () {
            $('body').on('click', '.elementselectormodal .submit', this.imageWidth.onModalSave.bind(this));
            $('body').on('click', '#redactor-modal-button-action', this.imageWidth.onModalSave.bind(this));

            this.core.element().on('modalOpened.callback.redactor', this.imageWidth.onModalOpen.bind(this));
        },

        onModalOpen: function (name, modal) {
            if (name != 'image-edit') {
                return;
            }

            var $positionSection = $(this.imageWidth.positionTemplate);
            var $redactorImage = $('#redactor-modal img');
            var src = $redactorImage.attr('src');
            var $bodyImage = $('.redactor-box img[src*="' + src + '"]');
            var width = $bodyImage.attr('width') || $redactorImage[0].naturalWidth;

            // insert width element
            $('#redactor-modal section:last-child').prepend($positionSection);

            $('#redactor-image-width').val(width);
        },

        onModalSave: function () {
            var width = $('#redactor-image-width').val();
            var $redactorImage = $('#redactor-modal img');
            var src = $redactorImage.attr('src');
            var $bodyImage = $('.redactor-box img[src*="' + src + '"]');

            $bodyImage.attr('width', width);
        }
    };
};

var redactorImageWidth = {
    init: function () {
        this.makeConfigEditable();
    },

    makeConfigEditable: function () {
        $('.js-make-enabled textarea').removeAttr('disabled');
    }
};

$(redactorImageWidth.init.bind(redactorImageWidth));
