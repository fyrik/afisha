import React, {Component} from 'react';
import {getStyles} from '../helpers';
import {Footer} from './Footer';
import {api} from '../API';


export class Kinoafisha extends Component {
    state = {
        selectedFilter: 'latest',
        films: [],
        sortClass: ''
    };

    render() {
        const styles = getStyles(this.state);

        const moviesJSX = this.state.films.map((movie) => {
            return (
                <div
                    className='movie'
                    key={movie.id}>
                    <div className='poster'>
                        <span>{movie.release}</span>
                        <span className='genre'>{movie.genre}</span>
                        <img src={movie.poster}/>
                        <span className='rating'>{movie.rating}</span>
                    </div>
                    <span className='title'>{movie.title}</span>
                </div>
            );
        });

        return (
            <>
                <div className='header'>
                    <div className='logo'></div>
                    <div className="filters">
                        <div
                            className={styles.latestFilter}
                            onClick={this.selectFilter}
                            data-name='latest'>
                            <span>New films</span>
                        </div>
                        <div
                            className={styles.upcomingFilter}
                            onClick={this.selectFilter}
                            data-name='upcoming'>
                            <span>Upcoming</span>
                        </div>
                        <div
                            className={styles.popularFilter}
                            onClick={this.selectFilter}
                            data-name='popular'>
                            <span>New films</span>
                        </div>
                    </div>
                </div>
                <div className="sorting">
                    <button className={this.state.sortClass} onClick={this.changeFilter}>по дате</button>
                </div>
                <div className="content">
                    {moviesJSX}
                </div>
                <Footer/>
            </>
        )
    };

    selectFilter = (event) => {
        const element = event.currentTarget.dataset.name;
        this.setState(
            {
                selectedFilter: element
            }
        );

        this.getFilms(element);
    };

    changeFilter = () => {
        const films = this.state.films;

        this.setState({
            sortClass: this.state.sortClass === '' ? 'desc' : ''
        });

        if (this.state.sortClass === 'desc') {
            this.sortBy(films, [-1, 1])
        } else {
            this.sortBy(films, [1, -1])
        }

        this.setState({
            films: films
        })

    };

    getFilms = async (filter) => {
        const movie = await api.getMovies(filter);

        this.setState({
            films: this.sortBy(movie, [-1, 1])
        })
    };

    sortBy = (arr, sortBy) => {
        return arr.sort(function (a, b) {
            if (a.release > b.release) {
                return sortBy[0];
            }
            if (a.release < b.release) {
                return sortBy[1];
            }
            return 0;
        });
    };

    componentDidMount() {
        if (this.state.selectedFilter !== '') {
            this.getFilms(this.state.selectedFilter);
        }
    }

}

