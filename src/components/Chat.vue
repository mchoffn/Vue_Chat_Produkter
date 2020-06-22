<template>
    <div class="chat container">
        <h2 class="center black-text">Eddies Chatroom</h2>
        <div class="card">
            <div class="card-content">
                <ul class="messages" v-chat-scroll>
                    <li v-for="message in messages" :key="message.id">
                        <span class="msg-name">{{ message.name }}</span>
                        <span class="msg-content">{{ message.content }}</span>
                        <span class="time text-time">{{ message.timestamp }}</span>
                    </li>
                </ul>
            </div>
            <div class="card-action">
                <NewMessage :name="name" />
            </div>
        </div>
    </div>
</template>

<script>
import NewMessage from '@/components/NewMessage'
import db from '@/firebase/init'
import moment from 'moment'
export default {
    name: 'Chat',
    props: ['name'],
    components: {
        NewMessage
    },
    data(){
        return{
            messages: []

        }
    },
    created(){
        let ref = db.firestore().collection('messages').orderBy('timestamp')
        
        ref.onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if(change.type == 'added'){
                let doc = change.doc
                this.messages.push({
                    id: doc.id,
                    name: doc.data().name,
                    content: doc.data().content,
                    timestamp: moment(doc.data().timestamp).format('LLLL')
                })
                }
            });
        })
    }
}
</script>

<style>

.msg-name{
    color:#749ef9;
}
.text-time{
    color:rgb(146, 145, 145);
}

.chat h2{
    font-size: 2.6em;
    margin-bottom: 20px;
}
.chat span{
    font-size: 1.4em;
}

.chat .time{
    display: block;
    font-size: 1.2em;
}

.messages{
    max-height: 300px;
    overflow: auto;
}
.messages::-webkit-scrollbar{
    width: 3px;
}
.messages::-webkit-scrollbar-track{
    background: #ddd;
}
.messages::-webkit-scrollbar-thumb{
    background: #aaa;
}
</style>