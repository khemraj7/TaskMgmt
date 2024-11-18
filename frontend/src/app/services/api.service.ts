import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_Url = 'http://localhost:5000/api'
  constructor(private http: HttpClient) { }

  get(url, query) {
    try {
      let user = JSON.parse(localStorage.getItem('Users'))
      let token = JSON.parse(localStorage.getItem('token'))

      const options = {
        headers: {},
        params: query
      }
      if (user && user['email']) {
        options.headers = {
          Authorization: token,
        }
      }

      return this.http.get(this.base_Url + url, options)
    } catch (error) {
      return error
    }


  }
  post(url, body) {
    try {
      let user = JSON.parse(localStorage.getItem('Users'))
      let token = JSON.parse(localStorage.getItem('token'))

      var headers = {}
      if (user && user['email'])
        headers = {
          Authorization: token,
        }
      return this.http.post(this.base_Url + url, body, { headers: headers })
    } catch (error) {
      return error
    }
  }
  patch(url, body) {
    try {
      let user = JSON.parse(localStorage.getItem('Users'))
      let token = JSON.parse(localStorage.getItem('token'))
      var headers = {}
      if (user && user['email']) {
        headers = {
          Authorization: token,
        }
      }
      return this.http.patch(this.base_Url + url, body, { headers: headers })
    } catch (error) {
      return error
    }
  }
  delete(url) {
    try {
      let user = JSON.parse(localStorage.getItem('Users'))
      let token = JSON.parse(localStorage.getItem('token'))

      var headers = {}
      if (user && user['email'])
        headers = {
          Authorization: token,
        }
      return this.http.delete(this.base_Url + url, { headers: headers })
    } catch (error) {
      return error
    }
  }



}
