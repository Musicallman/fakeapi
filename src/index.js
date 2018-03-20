import React from 'react';
import ReactDOM from 'react-dom';
import API from './API';
import $ from 'jquery';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        API.getPost()
            .then(data => this.setState({posts: data}));
    }

    removePost = id => () => {
        API.removePost(id)
            .then(isSuccess => {
                if (isSuccess) {
                    const {posts} = this.state,
                        removeElementIndex = posts.findIndex(p => p.id === id);

                    posts.splice(removeElementIndex, 1);

                    this.setState({posts});
                }
            })
    }


    addPost = e => {
        e.preventDefault();
        const {posts}= this.state;
        let title = $('#head').val(),
            body = $('#body').val(),
            data = {
                title: title,
                body: body,
                userId: 1
            }
        API.addPost(JSON.stringify(data)).then(data => {
            posts.unshift(data);
            console.log(this.state.posts);
            this.setState({posts})});

        }

    changePost = e => {
        e.preventDefault();
        const {posts}= this.state;
        let title = $('#head').val(),
            body = $('#body').val(),
            id = $('#id').val();

            if(title === '' && body === '')

                alert('заполните хотя бы одно поле!');

            else if (title === '')
            {
              let  data = {
                    id: id,
                    body: body,
                    userId: 1
                }


                API.changeField(JSON.stringify(data), id).then(data => {
                    console.log(data);
                posts[data.id - 1] = data;
                this.setState({posts})});

            }

            else if (body === '')
            {
                let  data = {
                    id: id,
                    title: title,
                    userId: 1
                }


                API.changeField(JSON.stringify(data), id).then(data => {
                    posts[data.id - 1] = data;
                    this.setState({posts})});
            }

            else
            {
                let  data = {
                    id: id,
                    title: title,
                    body: body,
                    userId: 1
                }


                API.changePost(JSON.stringify(data), id).then(data => {
                    posts[data.id - 1] = data;
                    this.setState({posts})});
            }


    }


    renderForm() {
        return (
            <div>
                <form id='form'>
                    <p>
                        <label>
                            Head:
                            <input type='text' id='head' name='head'/>
                        </label>
                    </p>
                    <p>
                        <label>
                            Body:
                            <textarea id='body' name='body'></textarea><br/>
                            <button id='add' type='submit' onClick={this.addPost}>
                                ADD POST
                            </button>
                            <br />
                            <label>
                                <button  onClick={this.changePost}>
                                    CHANGE POST WITH ID =
                                </button>
                                <input type='text' id='id' />
                            </label>


                        </label>
                    </p>
                </form>
            </div>
        );
    }


    renderPosts() {
        const {posts} = this.state;

        if (posts.length > 0) {
            return (

                <ul>
                    {posts.map(post =>
                        <li key={post.id}>
                            <h3>{post.title}</h3>
                            <p>{post.body}</p>
                            <button onClick={this.removePost(post.id)}>
                                remove post
                            </button>
                        </li>)}
                </ul>
            );
        }

        return <div>Loading...</div>;
    }



    render() {
        return (
            <div>
                {this.renderForm()}
                <h1>POSTS</h1>
                {this.renderPosts()}
            </div>
        );
    }
}




ReactDOM.render(
    <App/>,
    document.getElementById('root')
);
