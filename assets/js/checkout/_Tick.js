// function tickShow() {
//   // if (!support.svg()) {
//   //     return
//   // }
//   if (this.options.style === Tick.styles.DEFAULT) {
//       this.$circleClipPath.gfx({
//           scale: 1
//       }, {
//           duration: 300,
//           easing: "ease-in-out"
//       });
//       this.circleSvg.$el.gfx({
//           scale: 1,
//           opacity: 1
//       }, {
//           duration: 300,
//           easing: easingCurves.BOUNCING
//       })
//   } else if (this.options.style === Tick.styles.CIRCLE) {
//       this.$el.show();
//       this.$el.gfx({
//           scale: 1
//       }, {
//           duration: 300,
//           easing: easingCurves.BOUNCING
//       })
//   }
//   return setTimeout(function(_this) {
//       return function() {
//           _this.tickSvg.$el.gfx({
//               scale: 1
//           }, {
//               duration: 300,
//               easing: easingCurves.BOUNCING
//           });
//           return _this.$tickClipPath.gfx({
//               rotateZ: 0
//           }, {
//               duration: 300,
//               easing: "ease-in-out"
//           })
//       }
//   }(this), 190)
// };

// function tickHide(callback) {
//   return callback()
// };

var Svg, Tick, View, easingCurves, support, __bind = function(fn, me) {
    return function() {
        return fn.apply(me, arguments)
    }
},
__hasProp = {}.hasOwnProperty,
// __extends = function(child, parent) {
//     for (var key in parent) {
//         if (__hasProp.call(parent, key)) child[key] = parent[key]
//     }

//     function ctor() {
//         this.constructor = child
//     }
//     ctor.prototype = parent.prototype;
//     child.prototype = new ctor;
//     child.__super__ = parent.prototype;
//     return child
// };

// View = require("lib/view");
// Svg = require("inner/views/svg/svg");
// easingCurves = require("inner/lib/easingCurves");
// support = require("lib/support");
Tick = function(_super) {
  // __extends(Tick, _super);
  Tick.prototype.className = "tick";
  Tick.styles = {
      DEFAULT: "default",
      CIRCLE: "circle"
  };

  function Tick(options) {
      //this.$el = $(".buttonsView .button");

      this.$el = $(".buttonsView");
      var allPaths, paths, _base;
      this.options = options != null ? options : {};
      this.show = __bind(this.show, this);
      // Tick.__super__.constructor.apply(this, arguments);
      // if (!support.svg()) {
      //     return
      // }
      if ((_base = this.options).style == null) {
          _base.style = Tick.styles.DEFAULT;
      }
      this.$el.addClass(this.options.style);
      allPaths = {
          desktop: {
              ratio: 2,
              size: {
                  width: 20,
                  height: 21
              },
              tick: "M19.5737665,20.1779617 C19.5737665,20.1779617 34.8168611,2.04335654 36.9767799,1.20667896 C39.1366985,0.370001237 40.9589655,2.19541775 39.4398738,4.49110998 C37.920782,6.7868022 22.480015,29.304816 21.2369754,30.4356148 C19.9939359,31.5664137 18.6938931,30.7624669 17.8567721,30.0673949 C17.0196511,29.3723228 10.6984917,19.1564921 10.185462,18.1407053 C9.67243229,17.1249184 10.3167075,15.14835 10.9878753,14.6844383 C11.6590432,14.2205266 13.2273231,14.3176111 14.2110897,15.1588056 C15.1948563,16.0000001 19.5737665,20.1779617 19.5737665,20.1779617 Z M19.5737665,20.1779617",
              tickShadow: "M39.4398738,6.49110998 C37.920782,8.7868022 22.480015,31.304816 21.2369754,32.4356148 C19.9939359,33.5664137 18.6938931,32.7624669 17.8567721,32.0673949 C17.0196511,31.3723228 10.6984917,21.1564921 10.185462,20.1407053 C9.91663196,19.6084281 9.96557592,18.8123384 10.1696481,18.1083191 C10.6984917,19.1564921 17.0196511,29.3723228 17.8567721,30.0673949 C18.6938931,30.7624669 19.9939359,31.5664137 21.2369754,30.4356148 C22.480015,29.304816 37.920782,6.7868022 39.4398738,4.49110998 C39.5693703,4.29541141 39.6745855,4.10313027 39.7573802,3.91562434 C40.1298954,4.55714918 40.1100187,5.47836894 39.4398738,6.49110998 Z M39.4398738,6.49110998",
              circle: "M40,20.7105938 C40,31.7562893 31.0456955,40.7105938 20,40.7105938 C8.95430446,40.7105938 0,31.7562893 0,20.7105938 C0,9.66489825 8.95430446,0.710593794 20,0.710593794 C22.9866476,0.710593794 25.8203918,1.3652506 28.3655635,2.53889501 L25.5702131,5.70686918 C23.8355704,5.06262269 21.9588956,4.71059379 20,4.71059379 C11.1634436,4.71059379 4,11.8740374 4,20.7105938 C4,29.5471502 11.1634436,36.7105938 20,36.7105938 C28.8365564,36.7105938 36,29.5471502 36,20.7105938 C36,19.9757511 35.9504613,19.2524789 35.8545414,18.5439344 L38.4901013,13.0734603 C39.4631141,15.4266023 40,18.0058998 40,20.7105938 Z M40,20.7105938",
              circleShadow: "M0.0245650027,21.7105938 C0.00825233792,22.0418717 0,22.375269 0,22.7105938 C0,33.7562893 8.95430446,42.7105938 20,42.7105938 C31.0456955,42.7105938 40,33.7562893 40,22.7105938 C40,22.375269 39.9917477,22.0418717 39.975435,21.7105938 C39.4544037,32.2917058 30.7103708,40.7105938 20,40.7105938 C9.28962923,40.7105938 0.545596257,32.2917058 0.0245650027,21.7105938 Z M27.0773052,3.99887976 C27.5142352,4.16422602 27.9438603,4.3444368 28.3655635,4.53889501 L25.5702131,7.70686918 C23.8355704,7.06262269 21.9588956,6.71059379 20,6.71059379 C11.4992942,6.71059379 4.54693833,13.3398637 4.03074198,21.7105938 C4.0103478,21.3798783 4,21.0464445 4,20.7105938 C4,11.8740374 11.1634436,4.71059379 20,4.71059379 C21.9588956,4.71059379 23.8355704,5.06262269 25.5702131,5.70686918 L27.0773052,3.99887976 Z M35.969258,21.7105938 C35.9450297,21.3177024 35.9066223,20.9286475 35.8545414,20.5439344 L35.9936442,20.255207 C35.997872,20.4064869 36,20.5582918 36,20.7105938 C36,21.0464445 35.9896522,21.3798783 35.969258,21.7105938 Z M35.969258,21.7105938"
          },
          tablet: {
              ratio: 1,
              size: {
                  width: 28,
                  height: 31
              },
              tick: "M13.7016365,13.4245732 C13.7016365,13.4245732 24.3718028,0.730349576 25.8837459,0.144675271 C27.395689,-0.440999134 28.6712759,0.836792427 27.6079116,2.44377699 C26.5445474,4.05076154 15.7360105,19.8133712 14.8658828,20.6049304 C13.9957551,21.3964896 13.0857252,20.8337268 12.4997405,20.3471764 C11.9137558,19.860626 7.48894422,12.7095445 7.12982342,11.9984937 C6.7707026,11.2874429 7.22169523,9.90384497 7.69151272,9.57910679 C8.16133022,9.25436862 9.25912616,9.32232775 9.94776282,9.9111639 C10.6363994,10.5000001 13.7016365,13.4245732 13.7016365,13.4245732 Z M13.7016365,13.4245732",
              tickShadow: "M27.6401653,2.39401033 C28.0779966,2.83227761 28.1717048,3.59175766 27.6079116,4.44377699 C26.5445474,6.05076154 15.7360105,21.8133712 14.8658828,22.6049304 C13.9957551,23.3964896 13.0857252,22.8337268 12.4997405,22.3471764 C11.9137558,21.860626 7.48894422,14.7095445 7.12982342,13.9984937 C6.89336245,13.5303065 7.00812501,12.7705375 7.24822395,12.213447 C8.0447195,13.6058285 11.9516181,19.8920635 12.4997405,20.3471764 C13.0857252,20.8337268 13.9957551,21.3964896 14.8658828,20.6049304 C15.7360105,19.8133712 26.5445474,4.05076154 27.6079116,2.44377699 C27.6189124,2.42715231 27.6296629,2.41056285 27.6401653,2.39401033 Z M27.6401653,2.39401033",
              circle: "M28,14.4430509 C28,22.1750378 21.7319869,28.4430509 14,28.4430509 C6.26801312,28.4430509 0,22.1750378 0,14.4430509 C0,6.71106399 6.26801312,0.44305087 14,0.44305087 C16.1156079,0.44305087 18.121613,0.912315725 19.9196055,1.75243554 L18.4283421,3.28658971 C17.0581959,2.74227105 15.5640413,2.44305087 14,2.44305087 C7.37258267,2.44305087 2,7.81563354 2,14.4430509 C2,21.0704682 7.37258267,26.4430509 14,26.4430509 C20.6274173,26.4430509 26,21.0704682 26,14.4430509 C26,13.4952128 25.8901088,12.5730412 25.6823721,11.6885817 L27.1689213,9.68004053 C27.7067705,11.1668167 28,12.7706901 28,14.4430509 Z M28,14.4430509",
              circleShadow: "M0,16.4430509 C0,24.1750378 6.26801312,30.4430509 14,30.4430509 C21.7319869,30.4430509 28,24.1750378 28,16.4430509 C28,16.1068174 27.988147,15.7733524 27.964836,15.4430509 C27.4520895,22.7083268 21.3957534,28.4430509 14,28.4430509 C6.60424656,28.4430509 0.547910488,22.7083268 0.0351640458,15.4430509 C0.0118530331,15.7733524 0,16.1068174 0,16.4430509 Z M2.09284062,14.9430509 C2.05219595,14.6171066 2.02462333,14.2871027 2.01066393,13.9535805 C2.14300623,10.9639819 3.49841936,9.05800518 5.58836455,7.88475312 C3.70930417,9.73181153 2.43577562,12.1929313 2.09284062,14.9430509 Z M2.09284062,14.9430509"
          },
          mobile: {
              ratio: 2,
              size: {
                  width: 25,
                  height: 26
              },
              tick: "M23.9907115,24.2639075 C23.9907115,24.2639075 41.4898281,3.21124413 43.969421,2.23993589 C46.4490138,1.26862748 48.5409816,3.38777367 46.7970599,6.05286814 C45.0531381,8.71796258 27.3270932,34.8593735 25.9000802,36.1721303 C24.4730672,37.4848872 22.9806144,36.5515765 22.019597,35.7446597 C21.0585797,34.9377429 13.8018705,23.0780722 13.2129109,21.8988341 C12.6239513,20.7195959 13.3635811,18.4249757 14.1340837,17.8864155 C14.9045863,17.3478553 16.7049762,17.4605618 17.8343431,18.4371138 C18.96371,19.4136658 23.9907115,24.2639075 23.9907115,24.2639075 Z M23.9907115,24.2639075",
              tickShadow: "M46.7970599,8.05286814 C45.0531381,10.7179626 27.3270932,36.8593735 25.9000802,38.1721303 C24.4730672,39.4848872 22.9806144,38.5515765 22.019597,37.7446597 C21.0585797,36.9377429 13.8018705,25.0780722 13.2129109,23.8988341 C12.9288022,23.3299804 12.9538575,22.5015762 13.1424041,21.7359485 C13.1633788,21.7922627 13.1868435,21.8466409 13.2129109,21.8988341 C13.8018705,23.0780722 21.0585797,34.9377429 22.019597,35.7446597 C22.9806144,36.5515765 24.4730672,37.4848872 25.9000802,36.1721303 C27.3270932,34.8593735 45.0531381,8.71796258 46.7970599,6.05286814 C46.9872232,5.76225696 47.1317759,5.47813737 47.235189,5.20380852 C47.5835876,5.9394822 47.5191368,6.9493764 46.7970599,8.05286814 Z M46.7970599,8.05286814",
              circle: "M46,25 C46,22.6826957 45.624662,20.4530564 44.931457,18.3685396 L47.7330746,14.5831524 C49.1885491,17.7543141 50,21.2823947 50,25 C50,38.8071194 38.8071194,50 25,50 C11.1928806,50 0,38.8071194 0,25 C0,11.1928806 11.1928806,0 25,0 C29.5471574,0 33.8107718,1.21399163 37.4844836,3.33558626 L34.6160714,6.32606807 C31.7349256,4.83943385 28.465493,4 25,4 C13.4020197,4 4,13.4020197 4,25 C4,36.5979803 13.4020197,46 25,46 C36.5979803,46 46,36.5979803 46,25 Z M46,25",
              circleShadow: "M50,27 C50,40.8071194 38.8071194,52 25,52 C11.1928806,52 0,40.8071194 0,27 C0,26.6650867 0.00658567765,26.3317116 0.0196345977,26.0000029 C0.544539838,39.3435354 11.5277939,50 25,50 C38.472207,50 49.4554616,39.343534 49.9803655,26.0000002 C49.9934144,26.3317137 50,26.6650878 50,27 Z M37.4844836,5.33558626 L34.6160714,8.32606807 C31.7349256,6.83943385 28.465493,6 25,6 C13.7372467,6 4.54534486,14.8663642 4.02339035,26.0000032 C4.00785479,25.6686194 4,25.335227 4,25 C4,13.4020197 13.4020197,4 25,4 C28.465493,4 31.7349256,4.83943385 34.6160714,6.32606807 L36.2204965,4.65336423 C36.6490115,4.86894706 37.0704932,5.09650382 37.4844836,5.33558626 Z M37.4844836,5.33558626"
          }
      };
      paths = allPaths.desktop;
      if (this.options.appType.isTablet()) {
          paths = allPaths.tablet
      } else if (this.options.appType.isMobile()) {
          paths = allPaths.mobile
      }
      if (this.options.style === Tick.styles.DEFAULT) {
          this.circleSvg = new Svg({
              size: paths.size,
              color: "white",
              path: paths.circle,
              clipped: "circleClip",
              ratio: paths.ratio
          });
          this.$circleClipPath = this.circleSvg.addClipPath("M43.5,60 C71.3903812,60 94,37.3903812 94,9.5 C94,-18.3903812 71.3903812,-41 43.5,-41 C15.6096188,-41 -7,-18.3903812 -7,9.5 C-7,37.3903812 15.6096188,60 43.5,60 Z M43.5,60", "circleClip");
          this.circleSvg.addPath(paths.circleShadow, "rgba(55, 153, 15, 0.5000)", "circleClip");
          this.circleSvg.$el.transform({
              scale: 1.8,
              opacity: 0
          });
          this.$circleClipPath.transform({
              scale: .1
          }, {
              origin: "50% 50%"
          });
          console.log("-----1");
          console.log(this.circleSvg);
          console.log(this.circleSvg.$el);
          console.log(this.$el);
          this.$el.append(this.circleSvg.$el);
          console.log("-----2");
      } else if (this.options.style === Tick.styles.CIRCLE) {
          this.$el.hide();
          this.$el.transform({
              scale: .01
          })
      }
      this.tickSvg = new Svg({
          size: paths.size,
          color: "white",
          path: paths.tick,
          clipped: "clip1",
          ratio: paths.ratio
      });
      this.$tickClipPath = this.tickSvg.addClipPath("M0,0 L0,52 L50,52 L50,0 L0,0 Z M0,0", "clip1");
      this.tickSvg.addPath(paths.tickShadow, "rgba(55, 153, 15, 0.5000)", "clip1");
      this.tickSvg.$el.transform({
          scale: 1.8
      });
      this.$tickClipPath.transform({
          rotateZ: 90
      }, {
          origin: "0% 0%"
      });
      this.$el.append(this.tickSvg.$el)
  }
  Tick.prototype.show = function() {
      if (!support.svg()) {
          return
      }
      if (this.options.style === Tick.styles.DEFAULT) {
          this.$circleClipPath.gfx({
              scale: 1
          }, {
              duration: 300,
              easing: "ease-in-out"
          });
          this.circleSvg.$el.gfx({
              scale: 1,
              opacity: 1
          }, {
              duration: 300,
              easing: easingCurves.BOUNCING
          })
      } else if (this.options.style === Tick.styles.CIRCLE) {
          this.$el.show();
          this.$el.gfx({
              scale: 1
          }, {
              duration: 300,
              easing: easingCurves.BOUNCING
          })
      }
      return setTimeout(function(_this) {
          return function() {
              _this.tickSvg.$el.gfx({
                  scale: 1
              }, {
                  duration: 300,
                  easing: easingCurves.BOUNCING
              });
              return _this.$tickClipPath.gfx({
                  rotateZ: 0
              }, {
                  duration: 300,
                  easing: "ease-in-out"
              })
          }
      }(this), 190)
  };
  Tick.prototype.hide = function(callback) {
      return callback();
  };
  return Tick;
}();