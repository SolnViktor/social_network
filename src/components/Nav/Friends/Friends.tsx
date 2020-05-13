import React from 'react';
import styles from './Friends.module.css'

type FriendsNameType = {
    friendsName: string
}


const Friends = (props: FriendsNameType) => {
    return (

            <div className={styles.friends__block}>
                <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQT5L4MYG0Mq9Kjd29a7Ynxk5JDrYfIJRvQlRG3S-3wxzrNVokL&usqp=CAU"
                    alt="img"/>
                <a href="">{props.friendsName}</a>
            </div>

    );
}
export default Friends;