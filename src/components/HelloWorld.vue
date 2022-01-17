<template>
  <b-container>
    <b-navbar toggleable="lg" type="dark" variant="">
      <b-navbar-brand href="#">Spacestagram</b-navbar-brand>
      <b-form-input size="sm" class="mr-sm-2 search-box" v-model="searchText" placeholder="Search"
      v-on:keyup.enter="onSearch"></b-form-input>
      <b-button size="sm" class="my-2 my-sm-0" type="button" @click="onSearch">Search</b-button>
    </b-navbar>

  <b-card-group deck>
    <b-card v-for="image in images" :key="image.id" :title="getTitle(image)" 
      :img-src="getUrl(image)" img-alt="Image" img-top>
      <b-card-text>
        {{ getDesc(image) }}
      </b-card-text>
      <template #footer>
        <b-button :class='{ "liked": image.liked, "like-button": true }' @click="onLike(image)">
        <small class="">
          <b-icon icon="hand-thumbs-up" class="" variant="info"></b-icon>
          {{ image.liked ? "Liked": "Like" }}
        </small>
        </b-button>
        <div class="date">
          {{ getDateCreated(image) }}
        </div>
      </template>
    </b-card>

   
  </b-card-group>

  </b-container>
</template>

<script>
import { BContainer } from 'bootstrap-vue'
import { BNavbar } from 'bootstrap-vue'
import moment from 'moment'
import { getImage } from './../api/api.js'
const LIKED_IDS = "LIKED_IDS"
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    BContainer,
    BNavbar
  },
  mounted() {
    this.loadImages()
  },
  data() {
    return {
      count: 0,
      searchText: "earth",
      images: []
    }
  },
  methods: {
    loadImages() {
      getImage(this.searchText).then((data) => {
        this.renderImages(data);
        let likedIds = localStorage.getItem(LIKED_IDS);
        if (likedIds) {
          // let set = new Set(JSON.parse(likedIds));
          // for (let image of this.images) {
          //   if (set.has(image.data[0].nasa_id)) {
          //     image.liked = true;
          //   }
          // }
        }
      });
    },
    renderImages(data) {
      this.images = data.data.collection.items.filter(item => item.data[0].media_type === "image").map(item => {
        return {
          ...item,
          liked: false
        };
      });

    },
    onSearch() {
      this.loadImages();
    },
    getUrl(item) {
      let id = item.data[0].nasa_id;
      return `http://images-assets.nasa.gov/image/${id}/${id}~orig.jpg`;
    },
    getTitle(item) {
      return item.data[0].title;
    },
    getDesc(item) { 
      return item.data[0].description.substr(0, 250) + '...';
    },
    getDateCreated(item) {
      let date = item.data[0].date_created;
      return moment(date).format('MMMM Do YYYY');
    },
    onLike(item) {
      let id = item.data[0].nasa_id;
      for (let image of this.images) {
        if (id === image.data[0].nasa_id) {
          image.liked = !image.liked;
          // localStorage.setItem(LIKED_IDS, JSON.stringify(this.likedIds));
          break;
        }
      }

    }
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$red: #ff1744;
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  // color: #42b983;
}
.navbar-dark .navbar-brand {
  color: green !important;
}
.search-box {
  width: 33%;
  margin-right: 10px;
}
.card-deck {
  display: flex;
  flex-wrap: wrap;
  .card {
    // flex: 1;
    padding: 5px;
    flex: 1;
    flex-basis: 33.333333%;
    // width: 33%;
    img {
      height: 50%;
    }
  }
}
.like-button, .like-button:focus {
  color: white;
  background-color: blue;
  small {
    svg {
      fill: white;
    }
  }
}
.like-button:hover, .like-button.liked {
  background-color: $red;
}
.like-button.liked { 
  svg {
    animation: spin 1s linear 1;
  }
}
.card-footer {
  display: flex;
  .date {
    flex: 1;
    text-align: right;
  }
}
@keyframes spin { 
  100% { 
    -webkit-transform: rotate(360deg); 
    transform:rotate(360deg); 
  } 
}
</style>
