/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
const { addFilter } = wp.hooks;
const { Fragment }	= wp.element;
const { InspectorControls }	= wp.blockEditor;
const { createHigherOrderComponent } = wp.compose;
import { Panel, PanelBody, PanelRow } from '@wordpress/components';
const { ToggleControl } = wp.components;

//restrict to specific block names
const allowedBlocks = [ 'core/group' ];

/**
  * Add custom attribute for mobile visibility.
  *
  * @param {Object} settings Settings for the block.
  *
  * @return {Object} settings Modified settings.
  */
function addAttributes( settings ) {
     
    //check if object exists for old Gutenberg version compatibility
    //add allowedBlocks restriction
    if( allowedBlocks.includes( settings.name ) ){
     
        const { attributes } = settings;
        return {
            ...settings,
            attributes: {
                ...attributes,
                slideContentIn:{ 
                    type: 'boolean',
                    default: false,
                },
                slideContentDirection:{ 
                    type: 'boolean',
                    default: false,
                }
            }
        }      
    }
    return settings;
 }

 addFilter(
    'blocks.registerBlockType',
    'huishu/slide-in-content',
    addAttributes
);

/**
  * Add mobile visibility controls on Advanced Block Panel.
  *
  * @param {function} BlockEdit Block edit component.
  *
  * @return {function} BlockEdit Modified block edit component.
  */
const withInspectorControls = createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
       const {
           name,
           attributes,
           setAttributes,
           isSelected,
       } = props;

       const {
            slideContentIn,
            slideContentDirection,
        } = attributes;
        
        
        return (
            <Fragment>
                <BlockEdit {...props} />
                { isSelected && allowedBlocks.includes( name ) &&
                    <InspectorControls>
                       <Panel>
                           <PanelBody title="Gruppe beim Scrollen einblenden" initialOpen={ true }>
                               <PanelRow>
                                   <ToggleControl
                                           label={ !! slideContentIn ? 'Gruppe wird beim Scrollen eingeblendet' : 'Gruppe wird immer angezeigt (kein Einblenden beim Scrollen)' }
                                           checked={ !! slideContentIn }
                                           onChange={ () => setAttributes( {  slideContentIn: ! slideContentIn } ) }
                                       />
                               </PanelRow>
                               {
                                    !! slideContentDirection &&
                                    <ToggleControl
                                           label={ !! slideContentDirection ? 'Gruppe wird von links eingeblendet' : 'Gruppe wird von rechts eingeblendet' }
                                           checked={ !! slideContentDirection }
                                           onChange={ () => setAttributes( {  slideContentDirection: ! slideContentDirection } ) }
                                       />
                                }
                           </PanelBody>
                       </Panel>
                    </InspectorControls>
                }

            </Fragment>
        );
    };
}, 'withInspectorControls');

addFilter(
    'editor.BlockEdit',
    'huishu/slide-in-content',
    withInspectorControls
);

/**
  * Add custom element class in save element.
  *
  * @param {Object} extraProps     Block element.
  * @param {Object} blockType      Blocks object.
  * @param {Object} attributes     Blocks attributes.
  *
  * @return {Object} extraProps Modified block element.
  */
function applyExtraClass( extraProps, blockType, attributes ) {
 
    const { 
        slideContentIn,
        slideContentDirection
     } = attributes;
    
    //check if attribute exists for old Gutenberg version compatibility
    //add class only when visibleOnMobile = false
    //add allowedBlocks restriction
   if ( typeof slideContentIn !== 'undefined' && slideContentIn && allowedBlocks.includes( blockType.name ) ) {
       extraProps.className = classnames( extraProps.className, 'hsic-is-slide-in-content' );
        if ( typeof slideContentDirection !== 'undefined' && slideContentDirection ) {
            extraProps.className = classnames( extraProps.className, 'hsic-slides-in-from-left' );
        }
   }
   return extraProps;
}

addFilter(
    'blocks.getSaveContent.extraProps',
    'huishu/slide-in-content',
    applyExtraClass
);