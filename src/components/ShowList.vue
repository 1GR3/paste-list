<template>
  <div class="container">
    <ul class="nav nav-tabs" role="tablist">
      <li class="nav-item" v-for="category in categories" :key="category.name">
        <a
          class="nav-link"
          :class="{ active: category.name === activeCategory }"
          :href="'#' + category.name"
          @click="setActiveCategory(category.name)"
          role="tab"
          :aria-selected="category.name === activeCategory"
        >
          {{ category.name }}
        </a>
      </li>
    </ul>

    <div class="tab-content">
      <div
        class="tab-pane fade"
        v-for="category in categories"
        :key="category.name"
        :id="category.name"
        role="tabpanel"
        :aria-labelledby="category.name"
        :class="{ 'show active': category.name === activeCategory }"
      >
        <ul class="content-list">
          <li v-for="entry in category.entries" :key="entry.url">
            <a :href="entry.url">{{ entry.og_metadata.title }}</a>
            <p>{{ entry.og_metadata.description }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShowList",
  data() {
    return {
      activeCategory: "kids",
      categories: [],
    };
  },
  mounted() {
    this.loadCategories();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await fetch("/data/list.json");
        const data = await response.json();
        this.categories = data.categories.map((category) => ({
          name: category.name,
          entries: category.entries,
        }));
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    },
    setActiveCategory(category) {
      this.activeCategory = category;
    },
  },
};
</script>

<style>
ul.content-list {
  list-style-type: none;
  text-align: left;
}
</style>
