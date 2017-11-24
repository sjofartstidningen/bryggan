import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getPages } from '../../../store/tidningen/actions';
import PreviewContainer from '../components/PreviewsContainer';
import PageThumbnail from '../components/PageThumbnail';
import Title from '../../../components/Typography/Title';
import SectionTitle from '../../../components/Typography/SectionTitle';

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
        <Title to="/tidningen">
          <span ref={this.getTitleWidth}>Tidningen</span>
        </Title>

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
