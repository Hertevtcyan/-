 
    var countries = {
        "RU": {
            "code": "RU",
            "title": "\u0420\u043e\u0441\u0441\u0438\u044f",
            "cost": "1090",
            "delivery": "390",
            "old_price": "2180",
            "currency": "\u0440\u0443\u0431.",
            "fake_price": "1480",
            "selected": true
        },
        "BY": {
            "code": "BY",
            "title": "\u0411\u0435\u043b\u0430\u0440\u0443\u0441\u044c",
            "cost": "35",
            "delivery": "5",
            "old_price": "70",
            "currency": "\u0440\u0443\u0431.",
            "fake_price": "40"
        },
        "KZ": {
            "code": "KZ",
            "title": "\u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d",
            "cost": "7990",
            "delivery": "1500",
            "old_price": "11380",
            "currency": "&#12306;",
            "fake_price": "9490"
        },
        "AM": {
            "code": "AM",
            "title": "\u0410\u0440\u043c\u0435\u043d\u0438\u044f",
            "cost": "14990",
            "delivery": "2500",
            "old_price": "29980",
            "currency": "&#1380;&#1408;.",
            "fake_price": "17490"
        }
    };
    // construct
    function mA1Helper(options) {
        this.options = $.extend({
            countries: {},
            init: true,
            leave: '.ma1leaveBlock',
            callback: '.ma1callbackBlock',
            buyers: {
                buy: '{name} заказал(а) {buy} упаковок на сумму {sum}',
                remaining: 'Осталось упаковок <span class="blink">{count}</span>',
                gender: null,
            },
            online: 'Уже {online} человек сделали заказ',
        }, options);

        this.x = document.getElementsByClassName("orderFormWrapperCountry");
        this.order = {};
        this.debug = function() {
            if (typeof this.options.debug !== "undefined" && this.options.debug === true) {
                return true;
            }
            return false;
        }

        this.currentPrice = null;

        this.getBuyers = function(sex) {
            var m = ['Валерий Фе****', 'Владислав Ко****', 'Владимир Ма****', 'Валентин Ди****', 'Валерий Ще******', 'Иван Ба*****', 'Вячеслав Ку****', 'Михаил Ро*****', 'Сергей Во*****', 'Дмитрий Де*****', 'Вячеслав Шу****', 'Дима Ав*****', 'Денис Ми***', 'Евгений Ма*****', 'Виталий Ми****', 'Даниил Те*****', 'Влад Бу*****', 'Иван Гр*****', 'Алексей Ре*****', 'Владимир Су****', 'Вадим Тр*****', 'Вадим Га*****', 'Евгений Го****', 'Евгений Ба****', 'Сергей Жу***', 'Влад Че*****', 'Владислав Ни****', 'Виктор Че*****', 'Олег Як*****', 'Дмитрий Гл*****', 'Василий Кр****', 'Антон За****', 'Антон Бе****', 'Илья Со****', 'Сергей Ми****', 'Дмитрий Да****', 'Владислав Ра****', 'Дмитрий Вл*****', 'Иван Ма*****', 'Павел Пр*****', 'Никита Ки****', 'Максим Ша*****', 'Ярослав Ко****', 'Илья См*****', 'Андрей Ле****', 'Андрей Ни*****', 'Артём Ре****', 'Анатолий Ти*****', 'Ярослав За*****', 'Василий Гу****'];
            var w = ['Анна Па*****', 'Алина Ер*****', 'Александра Ло****', 'Елена Бы****', 'Марина Ел****', 'Анна Мо****', 'Ксения Кр*****', 'Алена Бо****', 'Виктория Ка****', 'Маргарита Бе****', 'Анна Ры*****', 'Дарья Са*****', 'Алла Кр*****', 'Евгения Ко****', 'Антонина Пе****', 'Ирина Со****', 'Алена Во****', 'Валентина Бу****', 'Вика Др****', 'Валерия Ло****', 'Кристина Со****', 'Наталья Го*****', 'Марина Ма*****', 'Катерина Ля****', 'Анастасия Ле*****', 'Екатерина Во*****', 'Наталья Ло****', 'Валентина Ля****', 'Вероника Ан****', 'Викуся Пр*****', 'Мария Ша****', 'Василиса Ма****', 'Ольга Дм****', 'Виктория Ни****', 'Дарья Пе****', 'Татьяна Ко****', 'Валентина Ко****', 'Оля Са******', 'Лилия Ма*****', 'Ирина Пе*****', 'Анна Да*******', 'Анастасия Во****', 'Полина Гр****', 'Мария Ко****', 'Кристина До****', 'Юлия Пу****', 'Татьяна Ла****', 'Валерия Лу****', 'Анастасия Шп****', 'Алёна Ши****'];

            switch (sex) {
                case 1:
                    return m;
                case 2:
                    return w;
                default:
                    return m.concat(w);
            }
        };

        this.updateCosts = function(cc) {
            this.currentPrice = this.options.countries[cc];
            this.currentPrice.shortCurrency = (cc == 'KZ' || cc == 'AM') ? this.currentPrice.currency : this.currentPrice.currency.charAt(0).toUpperCase() + '.';

            $('select[name="country"]').val(cc);

            $('.new_prise .new_prise_number, .displayCurrentPriceNoCyr').text(this.currentPrice.cost);
            $('.new_prise .new_prise_currency, .displayCurrentCurrency').html(this.currentPrice.currency);
            $('.realPrice, .displayCurrentPrice').html(this.currentPrice.cost + ' ' + this.currentPrice.currency);
            $('.old_price, .').html(this.currentPrice.old_price + ' ' + this.currentPrice.currency);

            $('.realPrice, .displayCurrentPriceShortCyr').html(this.currentPrice.cost + ' ' + this.currentPrice.shortCurrency);
            $('.old_price, .ShortCyr').html(this.currentPrice.old_price + ' ' + this.currentPrice.shortCurrency);

            $('.NoCyr').text(this.currentPrice.old_price);
            $('.ShortCyr').html(this.currentPrice.shortCurrency);
        };

        this.getContainer = function(element, attribute, inner) {
            if (typeof attribute !== 'object' || !attribute.hasOwnProperty('id') && !attribute.hasOwnProperty('class')) {
                if (this.debug()) {
                    console.log('Element has not own id or className');
                }
                return false;
            }

            var createElement = function(element, attribute, inner) {
                if (typeof(element) === "undefined") {
                    return false;
                }

                var el = document.createElement(element);
                if (typeof(attribute) === 'object') {
                    for (var key in attribute) {
                        el.setAttribute(key, attribute[key]);
                    }
                }
                if (typeof inner !== "undefined") {
                    el.innerHTML = inner;
                }

                return el;
            }

            var id = (attribute.hasOwnProperty('id')) ? '#' + attribute.id : '.' + attribute.class;

            if (!$(id).length) {
                $('body').append(createElement(element, attribute, inner));
            }

            return $(id);
        };


        this.formSubmit = function() {
        };

        this.clicker = function() {
            var elements = $('[data-click="true"]');
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).on("click", function() {
                    $($(this).data('target')).show();

                    $($(this).data('target')).children().first().on('click', function(e) {
                        e.stopPropagation();
                    });

                    $($(this).data('target')).on('click', function() {
                        $(this).hide();
                    });
                });
            }
        }

        this.toggleClick = function() {
            var elements = $('[data-toggle="true"]');
            for (var i = 0; i < elements.length; i++) {
                $(elements[i]).on("click", function() {
                    $($(this).data('target')).slideToggle();
                });
            }
        }

        if (typeof String.prototype.placeholder === "undefined") {
            String.prototype.placeholder = function(str) {
                return this.replace(/[\{](\w+)[\}]/g, function(all, key) {
                    return this.order[key] || key;
                });
            }
        }

        if (typeof String.prototype.capitalize === "undefined") {
            String.prototype.capitalize = function() {
                return this.charAt(0).toUpperCase() + this.slice(1);
            }
        }

        // start app
        if (this.options.init === true) {
            this.init();
        } else if (this.debug()) {
            console.log(this.options);
        }

        this.initCountries();
        this.clicker();
        this.toggleClick();
    }

    mA1Helper.prototype = {
        init: function() {
            if (this.debug()) {
                console.log(this.options);
            }
            this.checkPlugins();
            this.formSubmit();
        },

        checkPlugins: function() {
            var plugins = document.getElementsByTagName('body')[0].className.toLowerCase().split(" ");
            for (var i = 0; i < plugins.length; i++) {
                if (plugins[i].indexOf("plugin") > -1) {

                    plugin = 'plugin' + plugins[i].replace("plugin", "").capitalize();

                    if (typeof this[plugin] === "function") {
                        if (this.debug()) {
                            console.log('Init plugin: ' + plugins[i].replace("plugin", "").capitalize());
                        }
                        this[plugin]();
                    } else if (this.debug()) {
                        console.warn('Plugin not found: ' + plugins[i].replace("plugin", "").capitalize());
                    }
                }
            }

        },

        initCountries: function() {
            var _self = this;

            if (Object.keys(this.options.countries).length <= 0) {
                if (this.debug()) {
                    console.warn('Country object is empty!');
                }

                return false;
            }

            for (key in this.options.countries) {
                if (typeof this.options.countries[key].selected !== "undefined") {
                    this.currentPrice = this.options.countries[key];
                }
            }

            if (this.currentPrice === null) {
                this.currentPrice = this.options.countries[Object.keys(this.options.countries)[0]];
            }

            if (this.x.length < 1) {
                if (this.debug()) {
                    console.warn('Cant find form select!');
                }

                return false;
            }

            for (var i = 0; i < this.x.length; i++) {
                this.x[i].options.length = 0;

                for (key in this.options.countries) {
                    var option = document.createElement("option");
                    option.text = this.options.countries[key].title;
                    option.value = key;

                    if (typeof this.options.countries[key].selected !== "undefined") {
                        option.setAttribute('selected', true);
                    }

                    this.x[i].add(option);
                }
            }

            $(document).on('change', 'select[name="country"]', function() {
                _self.updateCosts($(this).val());
            });

            return this;
        },

        pluginBuyers: function() {
            var template = '<div class="show-message"><div class="show-message__item show-message_call"><i class="plugins-sprite plugins-sprite-bucket"></i><p class="show-message__info">' + this.options.buyers.buy + '<br /><span class="package_left">' + this.options.buyers.remaining + '</span></p></div></div>',
                onlineTemplate = '<div class="show-message"><div class="show-message__item show-message_online"><i class="plugins-sprite plugins-sprite-online_user"></i><p class="show-message__info">' + this.options.online + '</p></div></div>',
                all_pack = 60,
                max_pack = 7,
                min_pack = 3,
                online = (Math.floor(Math.random() * (500 - 50 + 1)) + 50);
            _self = this,
                buyers = this.getBuyers(this.options.buyers.gender)
            first = true;

            generatePrice = function() {
                var percent = (_self.currentPrice.old_price > 0) ? (_self.currentPrice.cost / _self.currentPrice.old_price) * 100 : 0;
                return Math.ceil((percent >= 10) ? _self.currentPrice.cost : _self.currentPrice.fake_price / 2);
            }

            getPack = function() {
                var pack = Math.floor(Math.random() * (max_pack - min_pack + 1)) + min_pack;
                all_pack -= pack;
                return pack;
            }

            displayMessage = function(template) {
                var messageContaiter = _self.getContainer('div', {
                    id: 'widgetPopUpMessages'
                });
                messageContaiter.on('click', function(e) {
                    $(this).hide();
                }).html(template).fadeIn(500).delay(6000).fadeOut(500);
            }

            updateRemaining = function() {
                $(".remainingPack").text(all_pack);
            }

            updateRemaining();
            var intervalID = setInterval(function() {
                if (first || (Math.floor(Math.random() * (5 - 1 + 1)) + 1) == 2) {
                    if (!first) {
                        online += Math.floor(Math.random() * (100 - 10 + 1)) + 10;
                    }
                    first = false;

                    this.order = {
                        online: online
                    }

                    return this.displayMessage(onlineTemplate.placeholder());
                }

                this.order = {
                    buy: getPack(),
                    name: buyers[Math.floor(Math.random() * buyers.length)],
                    sum: null,
                    count: all_pack
                };

                if (all_pack <= min_pack || all_pack <= order.buy) {

                    if (_self.debug()) {
                        console.log('Sold all packages');
                    }
                    clearInterval(intervalID);

                    return false;
                }

                this.order.sum = this.order.buy * this.generatePrice() + ' ' + _self.currentPrice.currency;

                this.displayMessage(template.placeholder());
                this.updateRemaining();

            }, 15000);

            return this;
        },

        pluginCallback: function() {
            var template = '<div class="phone-call cbh-phone cbh-green cbh-show  cbh-static" id="clbh_phone_div"><div class="phoneJs"><div class="cbh-ph-circle"></div><div class="cbh-ph-circle-fill"></div><div class="cbh-ph-img-circle1"></div></div></div>',
                widget = this.getContainer('div', {
                    class: 'bluePhone'
                }, template),
                _self = this;

            $(widget).on('click', function(e) {
                console.log(1);
                var container = $(_self.options.callback);
                if (container.length) {
                    container.show();

                    $(container).children().first().on('click', function(e) {
                        e.stopPropagation();
                    });

                    $(container).on('click', function() {
                        $(this).hide();
                    });
                }
            });


            return this;
        },

        pluginLeave: function() {
            var leave = false,
                _self = this;

            $(window).mouseout(function(e) {
                if (!leave && e.clientY < 0) {
                    var container = $(_self.options.leave);
                    if (container.length) {
                        container.show();
                        leave = true;

                        $(container).children().first().on('click', function(e) {
                            e.stopPropagation();
                        });

                        $(container).on('click', function() {
                            $(this).hide();
                        });

                        setTimeout(function() {
                            leave = false;
                        }, 50000);
                    }
                }
            });

            return this;
        },

        css: function(element, params) {
            if ($(element).length > 0) {
                $(element).css(params);
            } else if (this.debug()) {
                console.warn('Can\'t find element by selector ' + element);
            }

            return this;
        }
    };
    
    $(function() {
        (new mA1Helper({
            countries: countries
        }));
    });