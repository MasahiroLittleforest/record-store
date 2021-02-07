<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new artist</h3>

    <form @submit.prevent="addArtist">
      <div class="mb-6">
        <input
          type="text"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type an artist name"
          v-model="newArtist.name"
        />
      </div>

      <input type="submit" value="Add Artist" class="btn green" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li
        class="py-4"
        v-for="artist in artists"
        :key="artist.id"
        :artist="artist"
      >
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center">
            <svg
              class="fill-current text-indigo w-6 h-6 mr-2"
              viewBox="0 0 20 20"
              width="20"
              height="20"
            >
              <title>music artist</title>
              <path
                d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"
              ></path>
            </svg>
            {{ artist.name }}
          </p>

          <button
            class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
            @click.prevent="editArtist(artist)"
          >
            Edit
          </button>

          <button
            class="bg-transparent text-sm hover:bg-red hover:text-white text-red border border-red no-underline font-bold py-2 px-4 mr-2 rounded"
            @click.prevent="removeArtist(artist)"
          >
            Delete
          </button>
        </div>

        <div v-if="artist == editedArtist">
          <form @submit.prevent="updateArtist(artist)">
            <div
              class="mb-6 p-4 bg-white rounded border border-grey-light mt-4"
            >
              <input class="input" v-model="artist.name" />
              <input
                type="submit"
                value="Update"
                class="my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer"
              />
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      artists: [],
      newArtist: [],
      error: '',
      editedArtist: '',
    };
  },
  async created() {
    if (!localStorage.signedIn) {
      this.$router.replace('/');
    } else {
      try {
        const response = await this.$http.secured.get('/api/v1/artists');
        this.artists = response.data;
      } catch (error) {
        this.setError(error, 'Something went wrong');
      }
    }
  },
  methods: {
    setError(error, text: string) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        text;
    },
    async addArtist() {
      const newArtist = this.newArtist;
      if (!newArtist) return;

      try {
        const response = await this.$http.secured.post('/api/v1/artists', {
          artist: { name: newArtist.name },
        });
        this.artists.push(response.data);
        this.newArtist = '';
      } catch (error) {
        this.setError(error, 'Cannot create artist');
      }
    },
    async removeArtist(artist) {
      try {
        const response = await this.$http.secured.delete(
          `/api/v1/artists/${artist.id}`
        );
        this.artists.splice(this.artists.indexOf(artist), 1);
      } catch (error) {
        this.setError(error, 'Cannot delete artist');
      }
    },
    editArtist(artist) {
      this.editedArtist = artist;
    },
    updateArtist(artist) {
      this.editedArtist = '';
      try {
        this.$http.secured.patch(`/api/v1/artists/${artist.id}`, {
          artist: { name: artist.name },
        });
      } catch (error) {
        this.setError(error, 'Cannot update artist');
      }
    },
  },
});
</script>
