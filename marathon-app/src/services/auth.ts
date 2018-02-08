import firebase from 'firebase';

export class AuthService {
  public username: string;
  public email: string;

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

  editUser(displayName: string, photoURL: string = '') {
    let user = firebase.auth().currentUser;
    if(user) {
      user.updateProfile({
        displayName: displayName,
        photoURL: photoURL
      })
    }
    return firebase.database().ref('/users').child(user.uid + '/profile').update({
      name: displayName
    });
  }

  updateUserEmail(email: string) {
    let user = firebase.auth().currentUser;
    user.updateEmail(email);
    return firebase.database().ref('/users').child(user.uid + '/profile').update({
      email: email
    })
  }

  getUserDetails() {
    let user = firebase.auth().currentUser;
    if (user) {
      this.username = user.displayName;
      this.email = user.email;
    }
  }

  reauthenticateUser(email: string, password: string) {
    let user = firebase.auth().currentUser;
    let credential = firebase.auth.EmailAuthProvider.credential(email, password);
    return user.reauthenticateWithCredential(credential);
  }
}
