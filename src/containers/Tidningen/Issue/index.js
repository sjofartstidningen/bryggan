import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPages } from '../../../store/tidningen/actions';
import MainTitle from '../components/MainTitle';
import SectionTitle from '../components/SectionTitle';
import PreviewContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';

class Year extends Component {
  state = {
    translateTitle: 0,
  };

  componentDidMount() {
    const { year, issue } = this.props.match.params;
    this.props.getPages(year, issue);
  }

  getTitleWidth = ref => {
    if (ref) {
      const { width } = ref.getBoundingClientRect();
      this.setState(() => ({ translateTitle: width }));
    }
  };

  render() {
    const { pages, year, issue } = this.props;
    const { translateTitle } = this.state;

    return (
      <div>
        <MainTitle>
          <span ref={this.getTitleWidth}>Tidningen</span>
        </MainTitle>

        <section style={{ position: 'relative' }}>
          <SectionTitle translateTitle={translateTitle}>
            {[year, issue]}
          </SectionTitle>

          <PreviewContainer bind>
            {pages &&
              pages.length > 0 &&
              pages.map((page, i) => (
                <PageThumbnail
                  key={page.id}
                  to="/"
                  src={page.coverSrc}
                  description={`${i + 1}`}
                  alt={`Preview of page ${i + 1}`}
                />
              ))}
          </PreviewContainer>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state.tidningen.pages,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ getPages }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Year);
