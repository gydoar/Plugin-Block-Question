import "./index.scss"
import {TextControl, Flex, FlexBlock, FlexItem, Button, Icon, PanelBody, PanelRow, ColorPicker} from '@wordpress/components'
import {InspectorControls, BlockControls, AlignmentToolbar, useBlockProps} from '@wordpress/block-editor'
import {ChromePicker} from 'react-color'


(function (){
    let locked = false
    wp.data.subscribe(function(){
        const results = wp.data.select('core/block-editor').getBlocks().filter(function(block) {
            return block.name == 'ourplugin/paying-attention' && block.attributes.correctAnswer == undefined
        })
        if( results.length && locked == false ){
            locked = true
            wp.data.dispatch('core/editor').lockPostSaving('noanswer')
        }

        if( !results.length && locked ){
            locked = false
            wp.data.dispatch('core/editor').unlockPostSaving('noanswer')
        }
    })
})()

wp.blocks.registerBlockType('ourplugin/paying-attention', {
    title: 'Are you Paying Attention',
    icon: {
        src:(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4.475 5.458c-.284 0-.514-.237-.47-.517C4.28 3.24 5.576 2 7.825 2c2.25 0 3.767 1.36 3.767 3.215 0 1.344-.665 2.288-1.79 2.973-1.1.659-1.414 1.118-1.414 2.01v.03a.5.5 0 0 1-.5.5h-.77a.5.5 0 0 1-.5-.495l-.003-.2c-.043-1.221.477-2.001 1.645-2.712 1.03-.632 1.397-1.135 1.397-2.028 0-.979-.758-1.698-1.926-1.698-1.009 0-1.71.529-1.938 1.402-.066.254-.278.461-.54.461h-.777ZM7.496 14c.622 0 1.095-.474 1.095-1.09 0-.618-.473-1.092-1.095-1.092-.606 0-1.087.474-1.087 1.091S6.89 14 7.496 14Z"/>
      </svg>),
        background:'#f03',
        foreground:'#fff'
    },
    category: 'common',
    attributes:{
        question: {type:'string'},
        answers: {type: 'array', default: ['']},
        correctAnswer:{type:'number', default:undefined},
        bgColor:{type:'string', default:'#EBEBEB'},
        theAlignment:{type:'string', default:'left'}
    },
    description:'Give your audience a chance to prove their comprehension.',
    example:{
        attributes:{
            question: 'What is my name?',
            correctAnswer: 3,
            answers:['Andres', 'Carlos', 'Pedro'],
            theAlignment:'center',
            bgColor:'#6CAFB9'
        }
    },
    edit: EditComponent,

    save: function(props){
        return null
    }
})

// Edit: function
function EditComponent(props){

    const blockProps = useBlockProps({
        className:'paying-attention-edit-block', style: {backgroundColor:props.attributes.bgColor}
    })

    function updateQuestion(value){
        props.setAttributes({question:value})
    }
    function deleteAnswer(indexToDelete){
        const newAnswers = props.attributes.answers.filter(function(x,index){
            return index != indexToDelete
        })
        props.setAttributes({answers: newAnswers})
        if( indexToDelete == props.attributes.correctAnswer){
            props.setAttributes({correctAnswer:undefined})
        }
    }

    function markAsCorrect(index){
        props.setAttributes({correctAnswer:index})
    }

    return (
        <div {...blockProps} >
            <BlockControls>
                <AlignmentToolbar value={props.attributes.theAlignment} onChange={x => props.setAttributes({theAlignment:x})} />
            </BlockControls>

            <InspectorControls>
                <PanelBody title="Backgorund Color" initialOpen={true}>
                <PanelRow>
                    <ChromePicker color={props.attributes.bgColor} onChangeComplete={x => props.setAttributes({bgColor: x.hex})} desableAlpha={true}/>
                </PanelRow>
                </PanelBody>
            </InspectorControls>

            <TextControl label='Question: ' value={props.attributes.question} onChange={updateQuestion} style={{fontSize:"20px"}}/>
            <p style={{fontSize: "13px", margin: "20px 0 8px 0"}}>Answers:</p>
            {props.attributes.answers.map(function(answer, index){
                return(
                    <Flex>
                        <FlexBlock>
                            <TextControl  value={answer} onChange={newAnswer => {
                                const newAnswers = props.attributes.answers.concat([])
                                newAnswers[index] = newAnswer
                                props.setAttributes({answers: newAnswers})
                            }}/>
                        </FlexBlock>
                        <FlexItem>
                            <Button onClick={() => markAsCorrect(index)}>
                                <Icon className="mark-as-correct" icon={ props.attributes.correctAnswer == index ? 'star-filled' : 'star-empty'} />
                            </Button>
                        </FlexItem>
                        <FlexItem>
                            <Button isLink className="attention-delete" onClick={() => deleteAnswer(index)}>Delete</Button>
                        </FlexItem>
                    </Flex>
                )
            })}
            <Button icon="plus" isPrimary onClick={() => {
                props.setAttributes({answers: props.attributes.answers.concat([''])})
            }}>Add another answer</Button>
        </div>
    )
}