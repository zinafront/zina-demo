var URL_NOTIFICATIONS = window.URL_NOTIFICATIONS;

//var coinsId = 'coins-id';
//var arpeggioId = 'arpeggio-id';

function loadSounds() {
    //createjs.Sound.registerSound(window.__MEDIA_URL__ + "sounds/coins.ogg", coinsId);
    //createjs.Sound.registerSound(window.__MEDIA_URL__ + "sounds/arpeggio.ogg", arpeggioId);
}

function make_html(object) {
    var title = object.fields.title;
    if (object.fields.link) {
        title = '<a href="' + object.fields.link + '">' + title + '</a>';
    }
    var active = 'active';
    if (object.fields.read) {
        active = '';
    }
    var html_description = '';
    if (object.fields.is_html && object.fields.description) {
        html_description = '<div class="notification-desc">' + object.fields.description + '</div>';
    } else {
        html_description = '<p class="notification-desc">' + object.fields.description + '</p>';
    }
    var icon = window.__MEDIA_URL__ + 'img/logoZina-desktop-' + object.fields.level.toLowerCase() + '.png';
    var html = '<li class="notification ' + active + '" data-link="' + object.fields.link + '" id="notification-' + object.pk + '" >' +
        '<div class="media">' +
        '<div class="media-left img-container">' +
        '<div class="media-object">' +
        '<img data-src="' + icon + '" class="img-circle img-notification" alt="50x50" style="width: 50px; height: 50px;"' +
        'src="' + icon + '" data-holder-rendered="true">' +
        '</div>' +
        '</div>' +
        '<div class="media-body">' +
        '<h4 class="notification-title-mod">' + title + '</h4>' +
        html_description +
        '<div class="notification-meta">' +
        '<small class="timestamp time-not-mod">' + object.fields.timestamp + '</small>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</li>';
    return html;
}

function show_notification_html(object) {
    var html = make_html(object);
    $('.notification-list').append(html);
}

function show_notification_desktop(object) {
    if (!object.fields.shown) {
        var body = object.fields.description;
        if (object.fields.is_html) {
            body = '';
        }
        if (body){
            body = body.substr(0, 40) + '...';
        }
        Push.create(object.fields.title, {
            body: body,
            icon: window.__MEDIA_URL__ + 'img/logoZina-desktop-' + object.fields.level.toLowerCase() + '.png',
            tag: 'notification-' + object.pk,
            timeout: object.fields.timeout + (object.index * 3000),
            link: object.fields.link,
            // onShow: function () {
            //     createjs.Sound.play(arpeggioId);
            // },
            onClick: function () {
                window.focus();
                this.close();
                $.get(URL_NOTIFICATIONS, {'action': 'mark_as_read', 'id': this.tag}, function (data) {
                    // put your code here
                });
                if (object.fields.link) {
                    window.location.href = object.fields.link;
                }
            }
        });
    }
}

function show_notifications_html(data) {
    $('#span-total-unread').html(data.total_unread);
    var $notification_icon = $('#id-notification-icon');
    var mark_all_as_read = $('#mark-all-as-read-id');

    $notification_icon.attr('data-count', data.total_unseen_on_list);
    $notification_icon.attr('data-total', data.total);
    mark_all_as_read.attr('data-count-unread', data.total_unread);

    if (data.total > 0) {
        $notification_icon.addClass('notification-icon');
    } else {
        $notification_icon.removeClass('notification-icon');
        $notification_icon.attr('data-total', '');
    }
    if (data.total_unseen_on_list == 0) {
        $notification_icon.removeClass('notification-icon');
        $notification_icon.attr('data-count', '');
    }
    if (data.total_unread == 0) {
        mark_all_as_read.attr('data-count-unread', '');
    }
    $('.notification-list').html('');
    if (data.exists_notifications) {
        for (var i in data.list) {
            show_notification_html(data.list[i]);
        }
    }
}

function show_notifications_desktop(data) {
    if (data.exists_notifications) {
        for (var i in data.list) {
            data.list[i].index = i;
            show_notification_desktop(data.list[i]);
        }
    }
}

function get_notitications() {
    $.get(URL_NOTIFICATIONS, function (data) {
        show_notifications_desktop(data);
        show_notifications_html(data);
    });
}

function init_notifications() {
    $('#id-button-notifications').click(function (event) {
        var $notification_panel = $('#id-notification-panel');
        var $notification_icon = $('#id-notification-icon');
        var total = $notification_icon.attr('data-total');
        var total_unseen_on_list = $notification_icon.attr('data-count');
        if (total) {
            if ($notification_panel.hasClass("open")) {
                //$notification_panel.removeClass('open');
            } else {
                //$notification_panel.addClass('open');
                if (total_unseen_on_list) {
                    $notification_icon.removeClass('notification-icon');
                    $notification_icon.attr('data-count', '');
                    $.get(URL_NOTIFICATIONS, {'action': 'mark_as_see_on_list'}, function (data) {
                        console.log(data);
                    })
                }
            }
        }
    });

    $('#mark-all-as-read-id').click(function (event) {
        var mark_all_as_read = $(this);
        $('li.notification, .div-notification').removeClass('active');
        if (mark_all_as_read.attr('data-count-unread')) {
            $.get(URL_NOTIFICATIONS, {'action': 'mark_all_as_read'}, function (data) {
                mark_all_as_read.attr('data-count-unread', '');
            })
        }
    });

    $('.notification-list, .notification-list-inbox').on('click', '.notification', function (event) {
        event.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $.get(URL_NOTIFICATIONS, {'action': 'mark_as_read', 'id': $(this).attr('id')}, function (data) {
                // put your code here
            });
        }
        if ($(this).data('link')) {
            window.location.href = $(this).data('link');
        }
    });
    $('#clear-all-notifications').click(function (event) {
        $.get(URL_NOTIFICATIONS, {'action': 'clear_all_notifications'}, function (data) {
            console.log(data);
        });
        window.location.href = '.'
    })
}

function start_notifications(time) {
    init_notifications();
    loadSounds();
    get_notitications();
    window.setInterval(function () {
        get_notitications();
    }, time);
}