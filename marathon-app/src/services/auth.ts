import firebase from 'firebase';

export class AuthService {
  public username: string;
  public email: string;
  public photoURL: string;
  // public id: string;

  signup(email: string, password: string, name: string) {
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((user) => {
      user = firebase.auth().currentUser;
      user.updateProfile({displayName: name}).then(() => {
        firebase.database().ref('/users').child(user.uid).set({
          email: user.email,
          name: user.displayName,
          userType: 'user'
        });
      });
    })
  }

  signin(email: string, password: string) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  logout() {
    return firebase.auth().signOut();
  }

  editUser(displayName: string, photoURL: string) {
    let user = firebase.auth().currentUser;
    if(user) {
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      })
    }
    return firebase.database().ref('/users').child(user.uid).update({
      name: displayName
    });
  }

  changeUserPhoto(imgUrl: string) {
    let user = firebase.auth().currentUser;
    let imgPath = `users/${user.uid}.jpg`;
    return firebase.storage().ref('img').child(imgPath)
    .putString(imgUrl, firebase.storage.StringFormat.DATA_URL)
    .then(imgData => {
      user.updateProfile({
        displayName: user.displayName,
        photoURL: imgData.downloadURL
      })
      firebase.database().ref('/users').child(user.uid).update({
        imgPath: imgData.downloadURL
      });
    })
  }

  updateUserEmail(email: string) {
    let user = firebase.auth().currentUser;
    user.updateEmail(email);
    return firebase.database().ref('/users').child(user.uid).update({
      email: email
    })
  }

  changePassword(password: string) {
    let user = firebase.auth().currentUser;
    return user.updatePassword(password);
  }

  getUserDetails() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.username = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
    }
  }

  reauthenticateUser(email: string, password: string) {
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return user.reauthenticateWithCredential(credential);
  }
}
