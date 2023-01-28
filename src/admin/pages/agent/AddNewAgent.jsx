import React, { Component } from 'react'
import NumberFormat from 'react-number-format'
import SimpleReactValidator from 'simple-react-validator';
import {
    get_user_roles,
    create_new_agent,
    remove_all_state_agent
} from '../../../actions/admin/agentActions'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet';

class AddNewAgent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            phone: '',
            role: '',
            allPermissions: false,
            permissions: [
                { value: 'applications', name: 'Applications', isChecked: false },
                { value: 'accounts', name: 'Accounts', isChecked: false },
                { value: 'listings', name: 'Listings', isChecked: false },
                // { value: 'employees', name: 'Employees', isChecked: false },
                { value: 'settings', name: 'Settings', isChecked: false },
                // { value: 'users', name: 'Users', isChecked: false },
                { value: 'dms', name: 'DMS', isChecked: false },
                { value: 'agents', name: 'Agents', isChecked: false },

            ],
            roles: [
                { value: 3, name: 'Admin' }, { value: 4, name: 'Manager' }, { value: 5, name: 'Agent' }]
        }
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });

    }

    componentDidMount() {
        this.props.get_user_roles()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.user_roles !== this.props.user_roles && this.props.user_roles !== undefined && this.props.user_roles.length > 0) {
            const data = [];
            (this.props.user_roles || []).map(item => {
                if (Number(item.id) !== 1 && Number(item.id) !== 2) {
                    return data.push({
                        value: item.id,
                        name: item.user_type
                    })
                }
            })

            this.setState({
                ...this.state,
                roles: data
            })
        }
    }
    handleOnChange = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            [name]: value
        })
    }
    handleOnChangeCheck = (e, value) => {
        const permissions = this.state.permissions.slice().map(item => {
            if (item.value === value) {
                return {
                    ...item,
                    isChecked: !item.isChecked
                }
            }
            return item
        })
        const checkAll = permissions.filter(item => { return item.isChecked === false })
        this.setState({
            ...this.state,
            permissions: permissions,
            allPermissions: checkAll.length > 0 ? false : true
        })
    }
    handleOnCheckAll = (e) => {
        const { name, value } = e.target
        this.setState({
            ...this.state,
            allPermissions: !this.state.allPermissions,
            permissions: this.state.permissions.slice().map(item => {
                return {
                    ...item,
                    isChecked: !this.state.allPermissions
                }
            })
        })
    }
    addNewAgent = () => {
        if (!this.validator.fieldValid('Name')) {
            this.validator.showMessageFor('Name')
            this.forceUpdate();
            return false
        }
        if (!this.validator.fieldValid('Email')) {
            this.validator.showMessageFor('Email')
            this.forceUpdate();
            return false
        }
        if (!this.validator.fieldValid('Phone')) {
            this.validator.showMessageFor('Phone')
            this.forceUpdate();
            return false
        }
        if (!this.validator.fieldValid('Role')) {
            this.validator.showMessageFor('Role')
            this.forceUpdate();
            return false
        }
        let upuser_id = [];
        if (this.state.allPermissions === false) {
            upuser_id = [{
                "applications": (this.state.permissions || []).filter(item => (item.value === 'applications')).map(item => { return item.isChecked })[0],
                "accounts": (this.state.permissions || []).filter(item => (item.value === 'accounts')).map(item => { return item.isChecked })[0],
                "listings": (this.state.permissions || []).filter(item => (item.value === 'listings')).map(item => { return item.isChecked })[0],
                "employees": (this.state.permissions || []).filter(item => (item.value === 'employees')).map(item => { return item.isChecked })[0],
                "settings": (this.state.permissions || []).filter(item => (item.value === 'settings')).map(item => { return item.isChecked })[0],
                "users": (this.state.permissions || []).filter(item => (item.value === 'users')).map(item => { return item.isChecked })[0],
                "dms": (this.state.permissions || []).filter(item => (item.value === 'dms')).map(item => { return item.isChecked })[0],
                "agents": (this.state.permissions || []).filter(item => (item.value === 'agents')).map(item => { return item.isChecked })[0]

            }]

        } else {
            upuser_id = [{
                "applications": true,
                "accounts": true,
                "listings": true,
                "employees": false,
                "settings": true,
                "users": false,
                "dms": false,
                "agents": false
            }]
        }

        const data = {
            full_name: this.state.name,
            email: this.state.email,
            user_type: this.state.role,
            is_staff: true,
            is_active: true,
            is_verified: true,
            aud_user_id: [{
                name: this.state.name,
                telephone: this.state.phone
            }],
            phone: this.state.phone,
            role: this.state.role,
            upuser_id: upuser_id
        }
        this.props.create_new_agent(data)
        console.log(data)
    }
    componentWillUnmount() {
        this.setState({
            name: '',
            email: '',
            phone: '',
            role: '',
            allPermissions: false,
            permissions: [
                { value: 'applications', name: 'Applications', isChecked: false },
                { value: 'accounts', name: 'Accounts', isChecked: false },
                { value: 'listings', name: 'Listings', isChecked: false },
                // { value: 'employees', name: 'Employees', isChecked: false },
                { value: 'settings', name: 'Settings', isChecked: false },
                // { value: 'users', name: 'Users', isChecked: false },
                { value: 'dms', name: 'DMS', isChecked: false },
                { value: 'agents', name: 'Agents', isChecked: false }


            ],
            roles: [
                { value: 3, name: 'Admin' }, { value: 4, name: 'Manager' }, { value: 5, name: 'Agent' }]
        })
        this.validator = new SimpleReactValidator({ autoForceUpdate: this });
        this.props.remove_all_state_agent()

    }
    render() {
        return (<React.Fragment>
            <Helmet>
                <title>New Agent</title>
                <meta name="description" content="" />
            </Helmet>
            <div class="Admin-MainHead">

                <div class="Admin-HeadLeft">
                    <h1>Add a new Agent</h1>
                </div>

                <div class="Admin-HeadRight"></div>

            </div>

            <div class="clearfix"></div>

            <div class="Admin-DealerLeft">

                <div class="InnerDealer-Container">

                    <div class="InnerDealer-Head">

                        <div class="InnerLeft"><h1>Agent Information</h1></div>

                        <div class="InnerRight"></div>

                    </div>

                    <div class="DealerID-Container">

                        <div class="CustomMake-Form pt-0">

                            <div class="MakeLeft-Form">
                                <label>Name</label>
                                <input type="text" id="name" name="name" value={this.state.name} placeholder="Name" onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('Name')} />
                                {this.validator.message('Name', this.state.name, 'required')}
                            </div>

                            <div class="MakeRight-Form">
                                <label>Email</label>
                                <input type="email" id="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleOnChange} onBlur={() => this.validator.showMessageFor('Email')} />
                                {this.validator.message('Email', this.state.email, 'required|email')}
                            </div>

                        </div>

                        <div class="CustomMake-Form pt-3">

                            <div class="MakeLeft-Form">
                                <label>Telephone</label>
                                <NumberFormat
                                    format='+1 (###) ###-####'
                                    value={this.state.phone}
                                    name='phone'
                                    id='phone'
                                    placeholder='Phone No'
                                    onChange={this.handleOnChange}
                                    onBlur={() => this.validator.showMessageFor('Phone')}
                                />
                                {this.validator.message('Phone', this.state.phone, 'required|min:17')}
                            </div>

                            <div class="MakeRight-Form">
                                <label>Role</label>
                                <select name='role' onChange={this.handleOnChange}>
                                    <option value=''>Select</option>
                                    {(this.state.roles || []).map((item, index) => (
                                        <option value={item.value} >{item.name}</option>
                                    ))}
                                </select>
                                {this.validator.message('Role', this.state.role, 'required')}
                            </div>

                        </div>

                        <button type="button" class="mt-5" onClick={this.addNewAgent}>Add Agent</button>

                    </div>

                </div>

            </div>

            <div class="Admin-DealerRight">

                <div class="InnerDealer-Container">

                    <div class="InnerDealer-Head">

                        <div class="InnerLeft"><h1>Permissions</h1></div>

                        <div class="InnerRight"></div>

                    </div>

                    <div class="InnerMark-Container">
                        <div class="Admin-DocumetCheck">
                            <label class="DocBtn-Container">All Permissions
                                <input type="checkbox" name='allPermissions' value={'allPermissions'} checked={this.state.allPermissions} onChange={this.handleOnCheckAll} />
                                <span class="DocMark"></span>
                            </label>
                        </div>
                        {(this.state.permissions || []).map((item, index) => (
                            <div class="Admin-DocumetCheck">
                                <label class="DocBtn-Container">{item.name}
                                    <input type="checkbox" value={item.value} checked={item.isChecked === true} onChange={(e) => this.handleOnChangeCheck(e, item.value)} />
                                    <span class="DocMark"></span>
                                </label>
                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </React.Fragment>)
    }
}
const mapStateToProps = (state) => {
    return {
        user_roles: state.adminReducer.adminAccounts.agentReducer.user_roles,

    }
}
export default connect(mapStateToProps, {
    get_user_roles,
    create_new_agent,
    remove_all_state_agent
})(AddNewAgent)