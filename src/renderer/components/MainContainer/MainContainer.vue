<template>
  <div id='main-wrapper' class='content' @dragover.prevent @drop.prevent>
    <div class='notification-wrapper' v-if='notifications.length > 0'>
      <div v-for='(item, index) in notifications'
          :class='item.type'
          :item='item'
          :key='index'>
        <button class='delete' v-on:click='closeAlert(index)'></button>
        {{item.message}}
      </div>
    </div>

    <div class='columns'>
      <div class='column'>
        <div v-for='(item, index) in nameOptions'
              class='field'
              :key='index'>
          <p class='control'>
            <span class='label'> {{item.name}} : </span>
            <span class='select'>
              <select :name='item.name' @change='onSelect'>
                <option v-for='(option, index) in item.options'
                        :value='option.name'
                        :key='index'>
                  {{option.value}}
                </option>
              </select>
            </span>
          </p>
        </div>
        <a class='button is-info'
          v-on:click='onRenameFile'>Re-name</a>
      </div>
      <div class='column is-three-quarters'>
        <div id='dropzone-wrapper' class='tile'>
          <div class='tile is-child box'>
            <p class='title'>File</p>
            <p class='text-center'>
              Arrastra o selecciona el archivo que quieras renombrar :)
            </p>
            <droply id='myDroply'
                    ref='droplyOne'
                    url='https://httpbin.org/post'
                    upload-message-text='Drop file(s) to upload <br><strong>or click</strong>'
                    @droply-file-added='onFileAdded'
                    @droply-removed-file='onFileRemoved'
                    @droply-success='onSuccess'>
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
        nameOptions: [
          {
            name: 'project',
            options: [
              {
                name: 'savia',
                value: 'savia',
              }, {
                name: 'noe',
                value: 'noe',
              }, {
                name: 'diversion',
                value: 'diversión',
              }, {
                name: 'matesActivas',
                value: 'mates activas',
              },
            ],
          }, {
            name: 'subject',
            options: [
              {
                name: 'lengua',
                value: 'Lengua',
              }, {
                name: 'mates',
                value: 'Matemáticas',
              }, {
                name: 'geografia',
                value: 'Geografía',
              }, {
                name: 'latin',
                value: 'Latín',
              },
            ],
          }, {
            name: 'level',
            options: [
              {
                name: '1ESO',
                value: '1º eso',
              }, {
                name: '2ESO',
                value: '2º eso',
              }, {
                name: '3ESO',
                value: '3º eso',
              }, {
                name: '4ESO',
                value: '4º eso',
              },
            ],
          },
        ],
        file: null,
        processQueue: false,
        showRemoveAllButton: false,
        notifications: [],
      };
    },
    computed: {
      compoundName() {
        const temp = [];
        this.nameOptions.forEach(item => (temp[item.name] = ''));
        return temp;
      },
    },
    methods: {
      onSelect(event) {
        this.compoundName[event.target.name] = event.target.value;
      },
      onFileAdded() {
        if (this.$refs.droplyOne) {
          console.info('A file was successfully uploaded', this.$refs.droplyOne);
        }
        this.showRemoveAllButton = true;
      },
      onFileRemoved() {
        this.showRemoveAllButton = false;
        this.$refs.droplyOne.dropzone.enable();
      },
      onSuccess(file) {
        console.info('A file was successfully uploaded', file, this.$refs.droplyOne);
        this.file = file;
        this.$refs.droplyOne.dropzone.disable();
      },
      removeAll() {
        this.$refs.droplyOne.removeAllFiles();
      },
      isNameCorrect() {
        const me = this;
        const promise = new Promise((resolve, reject) => {
          let isValid = true;
          let newName = '';
          const properties = Object.keys(me.compoundName);
          const max = properties.length;
          let i = 0;
          for (; i < max; i += 1) {
            if (!me.compoundName[properties[i]]) {
              isValid = false;
              break;
            }
            newName += me.compoundName[properties[i]];
            if ((i + 1) < max) newName += '_';
          }
          if (isValid) resolve(newName);
          else reject(new Error('Nos has rellenado todos los campos!!'));
        });
        return promise;
      },
      showError(classType, messageText) {
        console.log('ERROR!!: ', classType);
        this.notifications.push({
          type: `notification ${classType}`,
          message: messageText,
        });
      },
      closeAlert(notificationIndex) {
        this.notifications.splice(notificationIndex, 1);
      },
      onRenameFile() {
        const me = this;
        if (!me.file) {
          me.showError('is-danger', 'Debes elegir un archivo.');
          return;
        }
        const path = me.file.path.substring(0, me.file.path.lastIndexOf('/'));
        me.isNameCorrect()
        .then(newName => me.$electron.ipcRenderer.send('renameFile', path, me.file.name, newName),
        () => { me.showError('is-danger', 'comprueba que todos los campos tengan un valor.'); });
      },
    },
    created() {
      console.log('created: ');
      const me = this;
      me.$electron.ipcRenderer.on('error-renameFile', () => {
        me.showError('is-danger', 'No se ha podido renombrar el archivo, inténtalo de nuevo.');
      });
      me.$electron.ipcRenderer.on('success-renameFile', (event, arg) => {
        me.$refs.droplyOne.removeAllFiles();
        me.file = null;
        me.showError('is-success', `Se ha renombrado corecctamente. Puedes encontrarlo en: ${arg}.`);
      });
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
    width: 100%;
  }
  .notification-wrapper {
    display: flex;
    position: relative;
    top: -45px;
    width: 100%;
    height: auto;
    flex-direction: column;
    padding: 5px 5px;
    z-index: 5;
    .notification {
      width: 100%;
      margin-top: 5px;
      margin-bottom: 0;
    }
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
