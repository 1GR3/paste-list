<template>
  <div class="container">
    <div class="my-3">
      <div class="input-group">
        <input
          type="text"
          id="urlInput"
          class="form-control"
          v-model="newEntry.url"
        />

        <button
          class="btn btn-secondary dropdown-toggle"
          type="button"
          id="categoryDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Add to
        </button>
        <ul
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="categoryDropdown"
        >
          <li
            v-for="category in categories"
            :key="category"
            @click="addEntry(category)"
          >
            <a class="dropdown-item">{{ category }}&nbsp;list</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddToList",
  data() {
    return {
      newEntry: {
        url: "",
        category: "",
      },
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
        this.categories = data.categories.map((category) => category.name);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    },
    async addEntry(category) {
      this.newEntry.category = category;

      // Perform validation and add the new entry to the list file
      // Send the new entry to the server endpoint for file writing
      this.saveEntryToServer(this.newEntry);

      // Clear the form
      this.newEntry.url = "";
      this.newEntry.category = "";
    },
    saveEntryToServer(entry) {
      // Send the new entry to the server endpoint for file writing
      // Make a POST request to the server's endpoint '/api/saveEntry'
      // The server will handle writing the entry data to the file
      axios
        .post("/api/saveEntry", entry)
        .then((response) => {
          if (response.status === 200) {
            console.log("Entry saved to file successfully.");
          } else {
            console.error("Error saving entry to file.");
          }
        })
        .catch((error) => {
          console.error("Error saving entry to file:", error);
        });
    },
  },
};
</script>
