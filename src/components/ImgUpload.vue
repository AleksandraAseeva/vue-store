<template>
  <div class="file-upload">
    <input type="file" id="fileInput" @change="handleFileChange" />
    <button @click="uploadFile" :disabled="!file">Загрузить</button>
    <div v-if="imageUrl" class="uploaded-image">
      <h3>Загруженное изображение:</h3>
      <img :src="imageUrl" alt="Uploaded Image" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null,
      imageUrl: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadFile() {
      if (!this.file) {
        alert("Пожалуйста, выберите файл для загрузки.");
        return;
      }

      const formData = new FormData();
      formData.append("file", this.file);

      try {
        const response = await fetch("https://faa45a9033a909b4.mokky.dev/uploads", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);

          this.imageUrl = URL.createObjectURL(this.file);
        } else {
          console.error("Ошибка при загрузке файла:", response.statusText);
          alert("Ошибка при загрузке файла.");
        }
      } catch (error) {
        console.error("Ошибка:", error);
        alert("Произошла ошибка при загрузке файла.");
      }
    },
  },
};
</script>

