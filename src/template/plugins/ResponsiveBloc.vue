<template>
    <div class="align-items-center container d-flex justify-content-center position-relative responsibe-block w-100" :style="{height: blockNumberNew + 'px'}">
        <div class="rb-blocs position-absolute"
            v-for="(responsibeBlock, index) of companyArrays"
            :key="index"
            :style="{
                width: responsiveBlockWidth + 'px',
                height: responsiveBlockWidth + 'px'
            }"
             :tablistElement="[responsibeBlock.company]"
            >
            <div class="rb-bloc p-2 w-100 h-100 shadow-lg position-relative bg-white" :style="{'backgroundImage': `url(/static/images/logos/${responsibeBlock.image})`}"
                @mouseover="toogleMouseOver"
                @mouseout="toogleMouseOut" >
                <div class="backgroundShadow" style="z-index:0"></div>
                <div class="d-flex justify-content-center align-items-center h-100 w-100 p-3">
                    <p style="z-index:1; opacity:0" class="border border-white p-1 text-white text-capitalize text-center font-weight-bold">
                        {{responsibeBlock.name}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../../main.js";
var mouseOverActiveGlobal = false;

export default {
  name: "responsibeBlock",
  data() {
    return {
      responsiveBlockWidth: null,
      responsiveBlockContainerHeight: null,
      displayBlockNumberlarge: 4,
      blockNumberNew: null,
      transformX: 0,
      transformY: 0,
      mouseOverActive: mouseOverActiveGlobal,
      experience: null,
      blockNumber: 0,
      companyArrays: null
    };
  },
  created() {
    var getBlockNumber = 0;
    var companyArray = [];
    eventBus.$on("getDataResponse", datas => {
      this.companyLogo = "/projects/";
      Object.keys(datas).map((items, index, value) => {
        Object.keys(datas[items]["projects"]).map((items2, index2, value2) => {
          companyArray.push({
            name: items2,
            image: datas[items].projects[items2].logo,
            company: datas[items].name
          });
          getBlockNumber += 1;
        });
      });
      this.blockNumber = getBlockNumber;
      this.companyArrays = companyArray;
    });
    eventBus.$on("ClickOnTab", (tabElement) => {
      Array.from(document.querySelectorAll(".rb-blocs")).map(items => {
        items.style.transform = "inherit";
        items.style.left = "inherit";
        items.style.top = "inherit";
        if (tabElement.getAttribute("tabElement") == "all") {
          items.classList.remove("hide");
          var displayBlockNumberlarge2 = this.displayBlockNumberlarge;

          responsiveBlockSize(displayBlockNumberlarge2);
        } else if (
          tabElement.getAttribute("tabElement").toLowerCase() !==
          items.getAttribute("tablistelement").toLowerCase()
        ) {
          items.classList.add("hide");
        } else {
          items.classList.remove("hide");
        }
        Array.from(
          document.querySelectorAll(
            "div[tablistelement=" + tabElement.getAttribute("tabElement") + "]"
          )
        ).map(items2 => {
          var displayBlockNumberlarge2 = this.displayBlockNumberlarge;
          responsiveBlockSize(displayBlockNumberlarge2);
        });
      });
    });
  },
  methods: {
    toogleMouseOver() {
      this.mouseOverActive = true;
    },
    toogleMouseOut() {
      this.mouseOverActive = false;
    }
  },
  mounted() {
    let transformXCount = 0;
    let transformYCount = 0;
    var displayBlockNumberlarge2 = this.displayBlockNumberlarge;
    let responsiveBlockContainer = document.querySelector(".responsibe-block")
      .offsetWidth;
    this.responsiveBlockWidth = Math.round(
      responsiveBlockContainer / this.displayBlockNumberlarge
    );
    this.responsiveBlockContainerHeight =
      this.responsiveBlockWidth *
      (this.experience / this.displayBlockNumberlarge);
    window.addEventListener("load", () => {
      responsiveBlockSize(displayBlockNumberlarge2);
      this.blockNumberNew = Math.round(
        this.responsiveBlockWidth *
          Math.ceil(this.blockNumber / this.displayBlockNumberlarge)
      );
    });
    window.addEventListener("resize", () => {
      let responsiveBlockContainer = document.querySelector(".responsibe-block")
        .offsetWidth;
      this.responsiveBlockWidth = Math.round(
        responsiveBlockContainer / this.displayBlockNumberlarge
      );
      this.responsiveBlockContainerHeight =
        this.responsiveBlockWidth *
        (this.experience / this.displayBlockNumberlarge);
      responsiveBlockSize(displayBlockNumberlarge2);
      this.blockNumberNew = Math.round(
        this.responsiveBlockWidth *
          Math.ceil(this.blockNumber / this.displayBlockNumberlarge)
      );
    });
  }
};
function responsiveBlockSize(displayBlockNumberlarge2) {
  var transformX = 0;
  var transformY = 0;
  Array.from(document.querySelectorAll(".rb-blocs")).map((items, index) => {
    items.style.transform =
      "translate3d(" + transformX + "px, " + transformY + "px, 0px)";
    items.style.left = 0;
    items.style.top = 0;
    items.style.opacity = 1;
    transformX += items.offsetWidth;
    if (index + 1 === displayBlockNumberlarge2) {
      transformX = 0;
      transformY += items.offsetWidth;
    }
  });
}
</script>
<style lang="scss">
.rb-blocs {
  padding: 2%;
  transition: 0.2s;
  left: calc(50% - 120px);
  top: calc(50% - 120px);
  &.hide {
    display: none;
  }
}
.rb-bloc {
  background-image: url(/static/images/logos/via-rail.png);
  background-repeat: no-repeat;
  background-size: 60%;
  background-position: center;
  transition: 0.2s;
  cursor: pointer;
  &:hover {
    background-size: 80%;
    .backgroundShadow {
      opacity: 1;
    }
    p {
      opacity: 1 !important;
    }
  }
}
.responsibe-block {
  min-height: 250px;
}
</style>

