const searchRoot = document.querySelector('[data-vue-search]');
const url = 'https://cdn.statcdn.com/static/application/search_results.json';

/* This is an example Vue app, feel free to use your own code. By default, Vue 2.6 and Axios are available. */

Vue.component('Greeting', {
  template: `
        <section class="grid-container">
            <img class ="img" src="https://images.pexels.com/photos/4207791/pexels-photo-4207791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Find your data" />

            <div class ="welcome">
              <h3> Welcome</h3>
              <p>
               Welcome to Statista.com
               <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste expedita consequatur delectus, laborum assumenda officiis vero, voluptas modi fugit culpa facilis veritatis suscipit molestiae eius. At omnis libero quos nisi, perferendis possimus cupiditate quis deserunt voluptates. Molestiae, ducimus! Saepe tenetur consectetur aut repellendus? Eligendi delectus velit quod quisquam hic id.</p>

               lorem
            </p>
            </div>

        </section>
    `,
});

Vue.component('SearchBar', {
  props: ['getData'],
  data() {
    return {
      searchTerm: 'statista',
    };
  },
  template: `
        <div class="pos-relative searchApp__container">
            <input v-model="searchTerm" placeholder="Search for statistics" type="text" />
            <button type="button" @click="getData" class="button button--primary searchApp__submitButton">
                Search
            </button>
        </div>
    `,
});

Vue.component('SearchResults', {
  props: ['results'],

  template: `
   <section class="">
    <h2>Results Section</h2>

    <h4 class= "panelCard padding-all-20" v-if="results.length < 1" > No Result Found</h4>

    <template v-else>

      <h5 class="panelCard padding-all-20">Search Result returned <strong>{{results.length}}</strong> values</h5>

      <div class="main" >
          <div class = "card"  v-for="(result) in results" :key=result.identifier>
            <h4 class = ""> {{result.title}}</h4>
            <p class = "">{{result.description}}</p>
           <em> <b>More Info here :  </b>{{result.link}}</em>
          </div>
      </div>
          
    </template>
        </section>
    `,
});

Vue.component('SearchApp', {
  data() {
    return {
      responseData: [],
    };
  },
  methods: {
    async getData() {
      const resp = await fetch(url);
      const data = await resp.json();
      this.responseData = data.items.splice(0, 20);
    },
  },
  template: `
        <div>
          <Greeting />
            <SearchBar :getData = "getData"/>
            <SearchResults  :results = "responseData"/>
        </div>
    `,
});

if (searchRoot) {
  new Vue({
    el: searchRoot,
    render(createElement) {
      return createElement('SearchApp');
    },
  });
}
