<template>
  <div id='main-wrapper' class='content'>
    <div class='columns'>
      <div class='column'>
        <div class='field'>
          <p class='control'>
            <span class='select'>
              <select v-model='project'>
                <option>Savia</option>
                <option>opción 1</option>
                <option>opción 2</option>
                <option>opción 3</option>
              </select>
            </span>
          </p>
        </div>
        <div class='field'>
          <p class='control'>
            <span class='select'>
              <select v-model='subject'>
                <option>Mates</option>
                <option>Lengua</option>
                <option>Geografia</option>
              </select>
            </span>
          </p>
        </div>
        <div class='field'>
          <p class='control'>
            <span class='select'>
              <select v-model='level'>
                <option>1º</option>
                <option>2º</option>
                <option>3º</option>
                <option>4º</option>
              </select>
            </span>
          </p>
        </div>
        <a class="button is-info">Re-name</a>
      </div>
      <div class='column is-three-quarters'>
        <div id='dropzone-wrapper' class='tile'>
          <div class='tile is-child box'>
            <p class='title'>Hello World</p>
            <p class='text-center'>
              This is as simple Dropzone demo using Vue.js
            </p>
            <droply id='myDroply'
                    ref='droplyOne'
                    url='https://httpbin.org/post'
                    upload-message-text='Drop file(s) to upload <br><strong>or click</strong>'
                    @droply-file-added='onFileAdded'
                    @droply-removed-file='onFileRemoved'
                    @droply-success='onSuccess'
                    @maxNumberOfFiles = 1>
            </droply>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import Droply from 'droply';
  export default {
    name: 'main-container',
    components: {
      Droply,
    },
    data() {
      return {
        project: 'Savia',
        subject: 'Mates',
        level: '1º',
        file: {},
        processQueue: false,
        showRemoveAllButton: false,
      };
    },
    watch: {
      project: function project(newData, oldData) {
        console.info('project updated', newData, oldData);
      },
      subject: function subject(newData, oldData) {
        console.info('project updated', newData, oldData);
      },
      level: function level(newData, oldData) {
        console.info('project updated', newData, oldData);
      },
    },
    methods: {
      onFileAdded() {
        this.showRemoveAllButton = true;
      },
      onFileRemoved() {
        this.showRemoveAllButton = false;
      },
      onSuccess(file) {
        console.info('A file was successfully uploaded', file, this.$refs.droplyOne);
        this.file = file;
      },
      removeAll() {
        this.$refs.droplyOne.removeAllFiles();
      },
    },
  };
</script>

<style lang='scss'>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #main-wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .dropzone {
    border: 2px dashed #88052b;
    color: #88052b;
    .dz-message {
      i {
        color: #88052b;
      }
      span {
        color: #88052b;
      }
    }
  }
</style>
