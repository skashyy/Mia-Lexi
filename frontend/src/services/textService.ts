import api from './apiService'
import store from '@/store'
export const TextService = {
    async wikipedia (url:string):Promise<string> {
        let pageName:string = url.substring(url.lastIndexOf("/")+1);
        pageName = pageName.split(" ").join("_");
        const result:string = await api.get(`/textInput/wikipedia/${pageName}`);
        return result
      },
     async getPracticeFile ():Promise<string> {
       const result:string = await api.get('/PracticeFile/get');
       return result;
     },
      async fileInput (file:string):Promise<string> {
        const formData = new FormData();
        formData.append("file", file);
        const result:string = await api.post('/textInput/file', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
          }
        });
        return result;
      },

      async save (fileName:string, index:number, fileContent:string):Promise<boolean> {
        const username = store.getters.username;
        const result:boolean = await api.post('/textFile/add', {
          fileName, username, index, fileContent
        })
        return result;
      },

      async updateIndex(fileName: string, index:number):Promise<boolean> {
        const username = store.getters.username;
        const result:boolean = await api.post('/textFile/updateIndex', {
          fileName, username, index
        })
        return result;
      },
      async getAll():Promise<string[]> {
        const result:string[] = await api.get(`/textFile/${store.getters.username}`)
        return result;
      },
      async getContent(fileName: string):Promise<any> {
        const username = store.getters.username;
        const result:any = await api.get(`/textFile/get`, {
          params: {fileName, username}
        })
        return result;
      },
      async addListToStore() {
        if ((store.getters.savedTitles[0] === "" || store.getters.savedTitles.length === 0) && store.getters.username !== '') {
          const savedTitles:string[] = await TextService.getAll();
          store.commit('setSavedTitles', savedTitles);
        }
      }
}